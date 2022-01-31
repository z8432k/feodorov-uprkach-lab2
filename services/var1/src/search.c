#include <stdio.h>
#include <stdlib.h>
#include <glib.h>
#include <jansson.h>
#include <simplepg.h>



int main(int argc, char* argv[]) {
    printf("Content-type: text/json\n\n");

    spg_set_options("servant.home.sky-unix.net", "alex-cgi",  "alex-cgi" , "alex-cgi-pass");


    GPtrArray *conds = g_ptr_array_new();

    json_t *rows, *jstr;
    rows = json_array();
    GPtrArray *data = spg_search("desk", conds);
    for (guint r = 0; r < data->len; r++) {
        json_t *cols = json_array();
        GPtrArray *row = g_ptr_array_index(data, r);
        for (guint c = 0; c < row->len; c++) {
            GString *str = g_ptr_array_index(row, c);
            jstr = json_string(str->str);
            json_array_append_new(cols, jstr);
            g_string_free(str, TRUE);
        }
        json_array_append_new(rows, cols);
        g_ptr_array_free(row, TRUE);
    }
    g_ptr_array_free(data, TRUE);

    // Dump JSON string
    gchar *json = json_dumps(rows, JSON_INDENT(2));

    json_decref(rows);
    spg_exit();

    printf("%s\n", json);

    return 0;
}
