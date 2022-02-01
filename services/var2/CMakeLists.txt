set(CMAKE_INCLUDE_CURRENT_DIR_IN_INTERFACE  ON)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_LIST_DIR}/bin)

link_libraries(simplepg)
# include_directories()

add_executable(find.cgi src/find.c)
add_executable(save.cgi src/save.c)
add_executable(main.cgi src/main.c)
