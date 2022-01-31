#ifndef SIMPLEPG_H
#define SIMPLEPG_H

#include <postgresql/libpq-fe.h>
#include <glib.h>

void spg_set_options(const gchar *h, const gchar *d, const gchar *u, const gchar *p);
void spg_exit();
GPtrArray* spg_get_distinct_col(const gchar* colName, const gchar* tbl);

#endif //SIMPLEPG_H
