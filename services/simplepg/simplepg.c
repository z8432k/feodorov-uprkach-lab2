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

static GPtrArray* resp2GPtrArray(PGresult *res) {
    GPtrArray *data = g_ptr_array_new();

    int rows = PQntuples(res);
    int cols = PQnfields(res);

    for (int r = 0; r < rows; r++) {
        GPtrArray *row = g_ptr_array_new();
        for (int c = 0; c < cols; c++) {
            GString *col = g_string_new(NULL);
            g_string_assign(col, PQgetvalue(res, r, c));
            g_ptr_array_add(row, col);
        }
        g_ptr_array_add(data, row);
    }

    return data;
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
        g_printerr("PGERROR: %s", PQerrorMessage(connection));
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

GPtrArray* spg_get_all(const gchar* tbl) {
    PGconn *conn = pgGetConnection();
    GPtrArray *data;

    GString *sql = g_string_new("");
    g_string_append_printf(sql, "SELECT DISTINCT * FROM %s;", tbl);

    PGresult *res = PQexec(conn, sql->str);

    if (PQresultStatus(res) != PGRES_TUPLES_OK) {
        g_printerr("PGERROR: %s", PQerrorMessage(connection));
        PQclear(res);
        do_exit(conn);
    }
    else {
        data = resp2GPtrArray(res);
    }

    g_string_free(sql, TRUE);

    if(res != NULL) {
        PQclear(res);
    }

    return data;
}

GPtrArray* spg_search(const gchar* tbl, const GPtrArray *conds) {
    PGconn *conn = pgGetConnection();
    GPtrArray *data;

    GString *sql = g_string_new("");
    g_string_append_printf(sql, "SELECT * FROM %s", tbl);

    if (conds->len > 0) {
        GString *where = g_string_new(" WHERE ");

        GPtrArray *cond;
        gchar *col, *val;
        if (conds->len > 0) {
            for (gsize i = 0; i < conds->len; i++) {
                if (i > 0) {
                    g_string_append(where, " AND ");
                }

                cond = g_ptr_array_index(conds, i);
                col = g_ptr_array_index(cond, 0);
                val = g_ptr_array_index(cond, 1);
                g_string_append_printf(where, " %s = '%s' ", col, val);
            }
        }

        g_string_append_printf(sql, " %s", where->str);
    }

    PGresult *res = PQexec(conn, sql->str);

    if (PQresultStatus(res) != PGRES_TUPLES_OK) {
        g_printerr("PGERROR: %s", PQerrorMessage(connection));
        PQclear(res);
        do_exit(conn);
    }
    else {
        data = resp2GPtrArray(res);
    }

    g_string_free(sql, TRUE);

    if(res != NULL) {
        PQclear(res);
    }

    return data;
}

void spg_begin() {
    PGconn *conn = pgGetConnection();

    PGresult *res = PQexec(conn, "BEGIN;");

    if (PQresultStatus(res) != PGRES_COMMAND_OK) {
        g_printerr("PGERROR: %s", PQerrorMessage(connection));
        PQclear(res);
        do_exit(conn);
    }
    else {
        if(res != NULL) {
            PQclear(res);
        }
    }
}

void spg_commit() {
    PGconn *conn = pgGetConnection();

    PGresult *res = PQexec(conn, "COMMIT;");

    if (PQresultStatus(res) != PGRES_COMMAND_OK) {
        g_printerr("PGERROR: %s", PQerrorMessage(connection));
        PQclear(res);
        do_exit(conn);
    }
    else {
        if(res != NULL) {
            PQclear(res);
        }
    }
}

void spg_truncate(const gchar* tbl) {
    PGconn *conn = pgGetConnection();

    GString *sql = g_string_new("");
    g_string_append_printf(sql, "TRUNCATE %s CASCADE;", tbl);

    PGresult *res = PQexec(conn, sql->str);

    if (PQresultStatus(res) != PGRES_COMMAND_OK) {
        g_printerr("PGERROR: %s", PQerrorMessage(connection));
        PQclear(res);
        do_exit(conn);
    }
    else {
        g_string_free(sql, TRUE);

        if(res != NULL) {
            PQclear(res);
        }
    }
}

void spg_load(const gchar* tbl, GPtrArray *collumns, GPtrArray *rows) {
    PGconn *conn = pgGetConnection();

    GString *sql = g_string_new("");
    g_string_append_printf(sql, "INSERT INTO %s (", tbl);

    for (size_t i = 0; i < collumns->len; i++) {
        if (i > 0) {
            g_string_append(sql, ", ");
        }
        gchar *col = g_ptr_array_index(collumns, i);
        g_string_append(sql, col);
    }
    g_string_append(sql, ") ");
    g_string_append(sql, "VALUES ");

    for (size_t r = 0; r < rows->len; r++) {
        GPtrArray *cols = g_ptr_array_index(rows, r);
        if (r > 0) {
            g_string_append(sql, ", ");
        }
        for (size_t c = 0; c < cols->len; c++) {
            if (c == 0) {
                g_string_append(sql, "(");
            }
            if (c > 0) {
                g_string_append(sql, ", ");
            }
            gchar *col = g_ptr_array_index(cols, c);
            g_string_append_printf(sql, "'%s'", col);
        }
        g_string_append(sql, ")");
    }

    PGresult *res = PQexec(conn, sql->str);

    if (PQresultStatus(res) != PGRES_COMMAND_OK) {
        g_printerr("PGERROR: %s", PQerrorMessage(connection));
        PQclear(res);
        do_exit(conn);
    }
    else {
        g_string_free(sql, TRUE);

        if(res != NULL) {
            PQclear(res);
        }
    }
}
