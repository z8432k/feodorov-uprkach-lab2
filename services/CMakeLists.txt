set(CMAKE_INCLUDE_CURRENT_DIR_IN_INTERFACE  ON)
set(CMAKE_EXE_LINKER_FLAGS "-static")

find_package(PkgConfig REQUIRED)

pkg_check_modules(GLIB2 REQUIRED glib-2.0)
pkg_check_modules(JANSSON REQUIRED jansson)

include_directories(
        ${GLIB2_INCLUDE_DIRS}
        ${JANSSON_INCLUDE_DIRS}
)

link_libraries(
        ${GLIB2_LDFLAGS}
        ${JANSSON_LDFLAGS}
)


add_subdirectory(var1)
