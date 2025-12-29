# MSYS2 building

## Building msys2-runtime

```bash
pushd ./ports/msys2-runtime
updpkgsums
makepkg --cleanbuild --syncdeps --force
```

## Building crosstool-ng

```bash
pushd /c/work/xemu/MSYS2-packages/crosstool-ng/
updpkgsums
makepkg --cleanbuild --syncdeps --force --install --noconfirm
```
