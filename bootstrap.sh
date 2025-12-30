rm -rf dist-old
mv dist dist-old
mkdir -p dist
pacman -Syu base-devel --noconfirm

pushd ./ports/msys2-runtime
updpkgsums
makepkg --cleanbuild --syncdeps --force --noconfirm
tar xf msys2-runtime-devel-3.6.5.1-1-x86_64.pkg.tar.zst  -C /
tar xf msys2-runtime-3.6.5.1-1-x86_64.pkg.tar.zst  -C /
mv msys2-runtime-devel-3.6.5.1-1-x86_64.pkg.tar.zst ../../dist/msys2-runtime-devel-3.6.5.1-1-x86_64-stage0.pkg.tar.zst
mv msys2-runtime-3.6.5.1-1-x86_64.pkg.tar.zst ../../dist/msys2-runtime-3.6.5.1-1-x86_64-stage0.pkg.tar.zst
makepkg --cleanbuild --syncdeps --force --noconfirm
tar xf msys2-runtime-devel-3.6.5.1-1-x86_64.pkg.tar.zst  -C /
tar xf msys2-runtime-3.6.5.1-1-x86_64.pkg.tar.zst  -C /
mv msys2-runtime-devel-3.6.5.1-1-x86_64.pkg.tar.zst .../../dist/
mv msys2-runtime-3.6.5.1-1-x86_64.pkg.tar.zst ../../dist/

popd

pushd ./ports/zstd
makepkg --cleanbuild --syncdeps --force --noconfirm
mv libzstd-1.5.7-2-x86_64.pkg.tar.zst ../../dist/
mv libzstd-devel-1.5.7-2-x86_64.pkg.tar.zst ../../dist/
mv zstd-1.5.7-2-x86_64.pkg.tar.zst ../../dist/
popd
