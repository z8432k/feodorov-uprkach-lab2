set(CMAKE_INCLUDE_CURRENT_DIR_IN_INTERFACE  ON)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_LIST_DIR}/bin)

link_libraries(simplepg)
# include_directories()

add_executable(search2.cgi src/search.c)
add_executable(load2.cgi src/load.c)
add_executable(init2.cgi src/init.c)
