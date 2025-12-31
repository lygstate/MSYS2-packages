
pushd ./ports/msys2-runtime
updpkgsums
makepkg --cleanbuild --syncdeps --force --noconfirm
mv msys2-runtime-devel-3.6.5.1-1-x86_64.pkg.tar.zst ../../dist/msys2-runtime-devel-3.6.5.1-1-x86_64-stage0.pkg.tar.zst
mv msys2-runtime-3.6.5.1-1-x86_64.pkg.tar.zst ../../dist/msys2-runtime-3.6.5.1-1-x86_64-stage0.pkg.tar.zst

tar xf ../../dist/gcc-libs-15.2.0-2-x86_64-stage0.pkg.tar.zst  -C /
tar xf ../../dist/msys2-runtime-devel-3.6.5.1-1-x86_64-stage0.pkg.tar.zst  -C /
tar xf ../../dist/msys2-runtime-3.6.5.1-1-x86_64-stage0.pkg.tar.zst  -C /
pacman -U  ../../dist/binutils-2.45.1-1-x86_64-stage0.pkg.tar.zst --noconfirm
pacman -U  ../../dist/gcc-15.2.0-2-x86_64-stage0.pkg.tar.zst --noconfirm

makepkg --cleanbuild --syncdeps --force --noconfirm
mv msys2-runtime-devel-3.6.5.1-1-x86_64.pkg.tar.zst ../../dist/
mv msys2-runtime-3.6.5.1-1-x86_64.pkg.tar.zst ../../dist/
tar xf ../../dist/msys2-runtime-devel-3.6.5.1-1-x86_64.pkg.tar.zst  -C /
tar xf ../../dist/msys2-runtime-3.6.5.1-1-x86_64.pkg.tar.zst  -C /

popd
