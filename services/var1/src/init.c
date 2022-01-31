#include <stdio.h>
#include <stdlib.h>
#include <glib.h>
#include <jansson.h>
#include <simplepg.h>


int main(int argc, char* argv[]) {
    printf("Content-type: text/json\n\n");

    spg_set_options("servant.home.sky-unix.net", "alex-cgi",  "alex-cgi" , "alex-cgi-pass");

    GPtrArray *collData = spg_get_distinct_col("source", "desk");

    char* json;

    json_t *arr, *obj, *field;
    arr = json_array();
    obj = json_object();

    field = json_string("cgi-data");
    json_object_set_new(obj, "field", field);
    json_array_append_new(arr, obj);

    json = json_dumps(arr, JSON_INDENT(2));

    json_decref(arr);

    printf("%s\n", json);

    return 0;
}

