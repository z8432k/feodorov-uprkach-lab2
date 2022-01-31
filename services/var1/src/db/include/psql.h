#ifndef CGI_PSQL_H
#define CGI_PSQL_H

#include <postgresql/libpq-fe.h>
#include <glib.h>

GPtrArray * getDistinctCol(const gchar* colName);

#endif //CGI_PSQL_H
