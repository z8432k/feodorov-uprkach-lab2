#include <psql.h>
#include <stdlib.h>
#include <errno.h>

static gchar *select_target = "SELECT DISTINCT target FROM desk;";
static gchar *select_klass = "SELECT DISTINCT klass FROM desk;";

static PGconn *connection;

static void do_exit(PGconn *conn) {
    PQfinish(conn);
    exit(1);
}

static void pg_normal_exit(PGresult *res) {
    if(res != NULL) {
        PQclear(res);
    }

    if(connection != NULL) {
        PQfinish(connection);
    }
}

static PGconn* pgGetConnection() {
    if (connection == NULL) {
        connection = PQconnectdb("user=alex-cgi dbname=alex-cgi host=servant.home.sky-unix.net password=alex-cgi-pass");;

        if (PQstatus(connection) == CONNECTION_BAD) {

            g_printerr("Connection to database failed: %s\n", PQerrorMessage(connection));
            do_exit(connection);
        }
    }

    return connection;
}


GPtrArray* getDistinctCol(const gchar* colName) {
    PGconn *conn = pgGetConnection();
    GPtrArray *data = g_ptr_array_new();

    gchar *sql = "SELECT DISTINCT source FROM desk WHERE 1=1 OR '1' = $1;";

    PGresult *res = PQexecParams(conn, sql,
                       1, NULL, &colName, NULL, NULL, 0);

    if (PQresultStatus(res) != PGRES_TUPLES_OK) {
        g_printerr("Data does not exist.\n");
        PQclear(res);
        do_exit(conn);
    }
    else {
        gsize rows = PQntuples(res);

        for (gsize i = 0; i < rows; i++) {
            GString *row = g_string_new(NULL);
            g_string_assign(row, PQgetvalue(res, 0, 0));
            g_ptr_array_add(data, row);
        }

        pg_normal_exit(res);
    }

    return data;
}
