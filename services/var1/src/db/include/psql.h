#ifndef CGI_PSQL_H
#define CGI_PSQL_H

#include <postgresql/libpq-fe.h>
#include <glib.h>

GArray * getDistinctCol(gchar* colName);

#endif //CGI_PSQL_H
