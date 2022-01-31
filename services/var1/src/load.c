#include <stdio.h>
#include <stdlib.h>
#include <glib.h>
#include <jansson.h>
#include <locale.h>
#include <simplepg.h>


void errorExit(gchar *err) {
    printf("Status: 500 Internal error.\n");
    printf("Content-type: text/html\n\n");

    printf("Internal server error.\n");
    g_printerr("%s", err);

    exit(EXIT_FAILURE);
}

int main(int argc, char* argv[]) {
    setlocale(LC_ALL, "");

    spg_set_options("servant.home.sky-unix.net", "alex-cgi",  "alex-cgi" , "alex-cgi-pass");


    gchar *method = getenv("REQUEST_METHOD");

    if (strncmp("POST", method, 4) != 0) {
        printf("Status: 400 Bad request.\n");
        printf("Content-type: text/html\n\n");

        printf("Bad request.\n");

        exit(EXIT_SUCCESS);
    }

    printf("Content-type: text/json\n\n");

    gsize csize = strtol(getenv("CONTENT_LENGTH"), NULL, 10);

    // Read POST data
    gchar *buff = (gchar *) g_malloc(csize);
    fread(buff, sizeof(char), (int) csize + 1, stdin);

    GString *jsonData = g_string_new("");
    g_string_append(jsonData, buff);
    g_free(buff);

    // Decode json
    json_error_t jsonErr;
    json_t *json = json_loads(jsonData->str, 0, &jsonErr);
    if (!json) {
        errorExit(jsonErr.text);
    }

    g_string_free(jsonData, TRUE);


    size_t siz = json_array_size(json);

    GPtrArray *rows = g_ptr_array_new();

    json_t *item;
    GPtrArray *row;
    const gchar *str;
    for (size_t i = 0; i < siz; i++) {
        row = g_ptr_array_new();
        item = json_array_get(json, i);

        str = json_string_value(json_object_get(item, "source"));
        g_ptr_array_add(row, (gpointer) str);

        str = json_string_value(json_object_get(item, "target"));
        g_ptr_array_add(row, (gpointer) str);

        str = json_string_value(json_object_get(item, "klass"));
        g_ptr_array_add(row, (gpointer) str);

        g_ptr_array_add(rows, row);
    }

    GPtrArray *cols = g_ptr_array_new();

    g_ptr_array_add(cols, "source");
    g_ptr_array_add(cols, "target");
    g_ptr_array_add(cols, "klass");

    spg_begin();
    spg_truncate("desk");
    spg_load("desk", cols, rows);
    spg_commit();

    json_t *arr, *field;
    arr = json_array();

    field = json_string("ok");
    json_array_append_new(arr, field);

    gchar *response = json_dumps(arr, JSON_INDENT(2));

    json_decref(arr);

    printf("%s\n", response);

    return 0;
}
