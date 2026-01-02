
pushd ./ports/zstd
makepkg --cleanbuild --syncdeps --force --noconfirm
mv libzstd-1.5.7-2-x86_64.pkg.tar.zst ../../dist/
mv libzstd-devel-1.5.7-2-x86_64.pkg.tar.zst ../../dist/
mv zstd-1.5.7-2-x86_64.pkg.tar.zst ../../dist/
popd

tar xf dist/libzstd-1.5.7-2-x86_64.pkg.tar.zst -C / 
tar xf dist/libzstd-devel-1.5.7-2-x86_64.pkg.tar.zst -C / 

pushd ./ports/bash
gpg --recv-keys BB5869F064EA74AB
makepkg --cleanbuild --syncdeps --force --noconfirm
mv bash-5.3.009-1-x86_64.pkg.tar.zst ../../dist/
popd

pushd ./ports/which
makepkg --cleanbuild --syncdeps --force --noconfirm
mv which-2.23-4-x86_64.pkg.tar.zst ../../dist/
popd
