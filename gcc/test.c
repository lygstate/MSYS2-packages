#include <stdio.h>
int main(int argc, char ** argv) {
    if (argc > 1) {
        printf("The argv1 is %s\n", argv[1]);
    }
}
// gcc ../../../test.c -o test.exe
// ./test.exe /c/work/xemu/CYGWIN-packages/ports/gcc/src/gcc-15.2.0/gcc
// gcc ../../../test.c -o test-msys2.exe