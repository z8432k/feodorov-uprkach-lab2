#include <psql.h>
#include <stdlib.h>
#include <errno.h>

static gchar *select_sources = "SELECT DISTINCT source FROM desk;";
static gchar *select_target = "SELECT DISTINCT target FROM desk;";
static gchar *select_klass = "SELECT DISTINCT klass FROM desk;";

GArray * getDistinctCol(gchar* colName) {

}
