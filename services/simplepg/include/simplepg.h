#ifndef CGI_SIMPLEPG_H
#define CGI_SIMPLEPG_H

#include <postgresql/libpq-fe.h>
#include <glib.h>

void spg_set_options(const gchar *h, const gchar *d, const gchar *u, const gchar *p);
GPtrArray* spg_get_distinct_col(const gchar* colName, const gchar* tbl);

#endif //CGI_SIMPLEPG_H
