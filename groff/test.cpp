
extern "C" {
  void _exit(int);
}

int i;
struct A {
  char dummy;
  A() { i = 1; }
  ~A() { if (i == 1) _exit(0); }
};

A a;

int main()
{
  return 1;
}


