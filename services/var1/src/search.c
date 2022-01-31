#include <stdio.h>
#include <stdlib.h>
#include <glib.h>
#include <jansson.h>
#include <simplepg.h>
#include <string.h>
#include <locale.h>

typedef struct {
    const gchar *source;
    const gchar *target;
    const gchar *klass;
} SearchReq;

int main(int argc, char* argv[]) {
    setlocale(LC_ALL, "");

    gchar *method = getenv("REQUEST_METHOD");

    if (strncmp("POST", method, 4) != 0) {
        printf("Status: 400 Bad request.\n");
        printf("Content-type: text/html\n\n");

        printf("Bad request.\n");

        exit(EXIT_SUCCESS);
    }

    printf("Content-type: text/json\n\n");

    gchar *cLength = getenv("CONTENT_LENGTH");
    gsize csize = strtol(cLength, NULL, 10);

    // Read json
    gchar *buff = (gchar *) g_malloc(csize);
    fgets(buff, (int) csize, stdin);
    GString *jsonData = g_string_new("");
    g_string_append(jsonData, buff);
    g_free(buff);


    // Decode json
    json_t *json = json_loads(jsonData->str, 0, NULL);
    g_string_free(jsonData, TRUE);

    SearchReq *req = g_new(SearchReq, 1);

    json_t *value = json_object_get(json, "source");
    req->source = json_string_value(value);

    value = json_object_get(json, "target");
    req->target = json_string_value(value);

    value = json_object_get(json, "klass");
    req->klass = json_string_value(value);

    // Make SQL req

    GPtrArray *conds = g_ptr_array_new();

    GPtrArray *cond = g_ptr_array_new();
    g_ptr_array_add(cond, "source");
    g_ptr_array_add(cond, req->source);
    g_ptr_array_add(cond, (void *) SPG_EQ);
    g_ptr_array_add(conds, cond);

    cond = g_ptr_array_new();
    g_ptr_array_add(cond, "target");
    g_ptr_array_add(cond, req->target);
    g_ptr_array_add(cond, (void *) SPG_EQ);
    g_ptr_array_add(conds, cond);

    cond = g_ptr_array_new();
    g_ptr_array_add(cond, "klass");
    g_ptr_array_add(cond, req->klass);
    g_ptr_array_add(cond, (void *) SPG_EQ);
    g_ptr_array_add(conds, cond);

    spg_set_options("servant.home.sky-unix.net", "alex-cgi",  "alex-cgi" , "alex-cgi-pass");

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
    gchar *jsonStr = json_dumps(rows, JSON_INDENT(2));

    // TODO: Free conds mem

    json_decref(json);
    g_free(req);
    spg_exit();

    printf("%s\n", jsonStr);

    return 0;
}
