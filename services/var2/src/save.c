#include <stdio.h>
#include <stdlib.h>
#include <glib.h>
#include <jansson.h>
#include <locale.h>
#include <simplepg.h>
#include <string.h>


void errorExit(gchar *err) {
    printf("Status: 500 Internal error.\n");
    printf("Content-type: text/html\n\n");

    printf("Internal server error.\n");
    g_printerr("%s", err);

    exit(EXIT_FAILURE);
}

int main(int argc, char* argv[]) {
    setlocale(LC_ALL, "");

    spg_set_options("servant.home.sky-unix.net", "mikle-sea",  "mikle-sea" , "mikle-sea");


    gchar *method = getenv("REQUEST_METHOD");

    if (strncmp("POST", method, 4) != 0) {
        printf("Status: 400 Bad request.\n");
        printf("Content-type: text/html\n\n");

        printf("Bad request.\n");

        exit(EXIT_SUCCESS);
    }

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

    GPtrArray *rows = g_ptr_array_new();
    GPtrArray *row = g_ptr_array_new();

    const gchar *str;
    str = json_string_value(json_object_get(json, "korabl"));
    g_ptr_array_add(row, (gpointer) str);

    str = json_string_value(json_object_get(json, "prichal"));
    g_ptr_array_add(row, (gpointer) str);

    str = json_string_value(json_object_get(json, "pribl"));
    g_ptr_array_add(row, (gpointer) str);

    str = json_string_value(json_object_get(json, "ubl"));
    g_ptr_array_add(row, (gpointer) str);

    g_ptr_array_add(rows, row);


    GPtrArray *cols = g_ptr_array_new();
    g_ptr_array_add(cols, "korabl");
    g_ptr_array_add(cols, "prichal");
    g_ptr_array_add(cols, "pribl");
    g_ptr_array_add(cols, "ubl");

    spg_load("registry", cols, rows);

    printf("Content-type: text/html\n\n ok\n");

    return 0;
}
