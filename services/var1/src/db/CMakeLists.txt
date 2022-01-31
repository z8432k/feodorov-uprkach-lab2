set(CMAKE_INCLUDE_CURRENT_DIR_IN_INTERFACE  ON)

pkg_check_modules(PGSQL REQUIRED libpq)


add_library(psdb OBJECT psql.c)

target_link_libraries(psdb
        PUBLIC
        ${GLIB2_LDFLAGS}
        ${PGSQL_LDFLAGS})

target_include_directories(psdb
        PUBLIC
        ${CMAKE_CURRENT_LIST_DIR}/include
        ${PGSQL_INCLUDE_DIRS})
