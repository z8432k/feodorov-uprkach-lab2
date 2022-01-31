#include <simplepg.h>
#include <stdlib.h>
#include <errno.h>

static PGconn *connection;
static const gchar *host, *db, *user, *pass;

void spg_set_options(const gchar *h, const gchar *d, const gchar *u, const gchar *p) {
    host = h;
    db = d;
    user = u;
    pass = p;
}

static void do_exit(PGconn *conn) {
    PQfinish(conn);
    exit(1);
}

void spg_exit() {
    if(connection != NULL) {
        PQfinish(connection);
    }
}

static PGconn* pgGetConnection() {
    if (connection == NULL) {
        GString *uri = g_string_new("");
        g_string_append_printf(uri, "user=%s dbname=%s host=%s password=%s", user, db, host, pass);

        connection = PQconnectdb(uri->str);

        if (PQstatus(connection) == CONNECTION_BAD) {

            g_printerr("Connection to database failed: %s\n", PQerrorMessage(connection));
            do_exit(connection);
        }

        g_string_free(uri, TRUE);
    }

    return connection;
}


GPtrArray* spg_get_distinct_col(const gchar* colName, const gchar* tbl) {
    PGconn *conn = pgGetConnection();
    GPtrArray *data = g_ptr_array_new();

    GString *sql = g_string_new("");
    g_string_append_printf(sql, "SELECT DISTINCT %s FROM %s;", colName, tbl);

    PGresult *res = PQexec(conn, sql->str);

    if (PQresultStatus(res) != PGRES_TUPLES_OK) {
        g_printerr("%s", PQerrorMessage(connection));
        PQclear(res);
        do_exit(conn);
    }
    else {
        gsize rows = PQntuples(res);

        for (gsize i = 0; i < rows; i++) {
            GString *row = g_string_new(NULL);
            g_string_assign(row, PQgetvalue(res, i, 0));
            g_ptr_array_add(data, row);
        }
    }

    g_string_free(sql, TRUE);

    if(res != NULL) {
        PQclear(res);
    }

    return data;
}
