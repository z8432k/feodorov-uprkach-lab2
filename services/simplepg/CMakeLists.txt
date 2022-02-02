set(CMAKE_INCLUDE_CURRENT_DIR_IN_INTERFACE  ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

pkg_check_modules(PGSQL REQUIRED libpq)

add_library(simplepg STATIC simplepg.c)

target_link_libraries(simplepg
        PUBLIC
        ${GLIB2_LDFLAGS}
        ${PGSQL_LDFLAGS})

target_include_directories(simplepg
        PUBLIC
        include
        ${PGSQL_INCLUDE_DIRS})
