cmake_minimum_required(VERSION 3.10)

project("tensaiji.routin" VERSION "0.0.0")

set(EXECUTABLE_OUTPUT_PATH "${CMAKE_SOURCE_DIR}/bin")
set(LIBRARY_OUTPUT_PATH "${EXECUTABLE_OUTPUT_PATH}/bib")
set(ROUTIN_MODULE "routin")
set(ROUTIN_SRC "src")
set(ROUTIN_DIST "dist")
set(ROUTIN_PACKAGE "${CMAKE_CURRENT_LIST_DIR}/package.json")
set(ROUTIN_TSCONFIG "${CMAKE_CURRENT_LIST_DIR}/tsconfig.json")
set(ROUTIN_WEBPACK_CONFIG "${CMAKE_CURRENT_LIST_DIR}/webpack.config.js")

configure_file("${ROUTIN_PACKAGE}.in" "${ROUTIN_PACKAGE}")
configure_file("${ROUTIN_TSCONFIG}.in" "${ROUTIN_TSCONFIG}")
configure_file("${ROUTIN_WEBPACK_CONFIG}.in" "${ROUTIN_WEBPACK_CONFIG}")
