#ifndef SIMPLEPG_H
#define SIMPLEPG_H

#include <postgresql/libpq-fe.h>
#include <glib.h>

enum SPG_WHERE_COND {
    SPG_GT,
    SPG_LT,
    SPG_NE,
    SPG_GE,
    SPG_LE,
    SPG_EQ
};

void spg_set_options(const gchar *h, const gchar *d, const gchar *u, const gchar *p);
void spg_exit();
GPtrArray* spg_get_distinct_col(const gchar* colName, const gchar* tbl);
GPtrArray* spg_get_all(const gchar* tbl);
GPtrArray* spg_search(const gchar* tbl, const GPtrArray *conds);

#endif //SIMPLEPG_H
