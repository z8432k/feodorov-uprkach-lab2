#include <stdio.h>
#include <glib.h>
#include <jansson.h>
#include <simplepg.h>

int main(int argc, char* argv[]) {
    printf("Content-type: text/json\n\n");

    spg_set_options("servant.home.sky-unix.net", "alex-cgi",  "alex-cgi" , "alex-cgi-pass");


    char* json;
    json_t *obj, *arr, *jstr;
    obj = json_object();

    arr = json_array();
    GPtrArray *data = spg_get_distinct_col("source", "desk");
    for (guint i = 0; i < data->len; i++) {
        GString *str = g_ptr_array_index(data, i);
        jstr = json_string(str->str);
        json_array_append_new(arr, jstr);
        g_string_free(str, TRUE);
    }
    json_object_set_new(obj, "source", arr);
    g_ptr_array_free(data, TRUE);


    arr = json_array();
    data = spg_get_distinct_col("target", "desk");
    for (guint i = 0; i < data->len; i++) {
        GString *str = g_ptr_array_index(data, i);
        jstr = json_string(str->str);
        json_array_append_new(arr, jstr);
        g_string_free(str, TRUE);
    }
    json_object_set_new(obj, "target", arr);
    g_ptr_array_free(data, TRUE);

    arr = json_array();
    data = spg_get_distinct_col("klass", "desk");
    for (guint i = 0; i < data->len; i++) {
        GString *str = g_ptr_array_index(data, i);
        jstr = json_string(str->str);
        json_array_append_new(arr, jstr);
        g_string_free(str, TRUE);
    }
    json_object_set_new(obj, "klass", arr);
    g_ptr_array_free(data, TRUE);

    json_t *rows = json_array();
    data = spg_get_all("desk");
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
    json_object_set_new(obj, "rows", rows);
    g_ptr_array_free(data, TRUE);

    // Dump JSON string
    json = json_dumps(obj, JSON_INDENT(2));

    json_decref(obj);
    spg_exit();

    printf("%s\n", json);

    return 0;
}

