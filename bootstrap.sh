rm -rf dist-old
mv dist dist-old
mkdir -p dist
pacman -Syu base-devel --noconfirm
pacman -U ./dist-init/msys2-runtime-3.6.5-1-x86_64.pkg.tar.zst --noconfirm
pacman -U ./dist-init/msys2-runtime-devel-3.6.5-1-x86_64.pkg.tar.zst --noconfirm
pacman -U --overwrite \* ./dist-init/gcc-libs-15.2.0-1-x86_64.pkg.tar.zst --noconfirm
pacman -U --overwrite \* ./dist-init/gcc-15.2.0-1-x86_64.pkg.tar.zst --noconfirm
rm -rf /usr/bin/cygwin1.dll

# Building cmake
pushd ./ports/cmake
# updpkgsums
makepkg --cleanbuild --syncdeps --force --noconfirm --install 
popd

# Building/install binutils and gcc first
pushd ./ports/binutils
gpg --recv-keys 738409F520DF9190
makepkg --cleanbuild --syncdeps --force --noconfirm
mv binutils-2.45.1-1-x86_64.pkg.tar.zst ../../dist/binutils-2.45.1-1-x86_64-stage0.pkg.tar.zst
popd

pushd ./ports/gcc
# updpkgsums
makepkg --cleanbuild --syncdeps --force --noconfirm
mv gcc-libs-15.2.0-2-x86_64.pkg.tar.zst ../../dist/gcc-libs-15.2.0-2-x86_64-stage0.pkg.tar.zst
mv gcc-15.2.0-2-x86_64.pkg.tar.zst ../../dist/gcc-15.2.0-2-x86_64-stage0.pkg.tar.zst
popd

sh bootstrap-msys2-runtime.sh
