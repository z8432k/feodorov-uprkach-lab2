set(CMAKE_INCLUDE_CURRENT_DIR_IN_INTERFACE  ON)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_LIST_DIR}/bin)

add_subdirectory(src/db)

link_libraries(psdb)
include_directories()

add_executable(list.cgi src/list.c)
add_executable(add.cgi src/load.c)
add_executable(init.cgi src/init.c)
