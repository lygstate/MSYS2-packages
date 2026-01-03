pushd ./ports/libiconv
makepkg --cleanbuild --syncdeps --force --noconfirm
mv bash-completion-2.17.0-2-any.pkg.tar.zst ../../dist
popd

pushd ./ports/bash-completion
makepkg --cleanbuild --syncdeps --force --noconfirm
mv bash-completion-2.17.0-2-any.pkg.tar.zst ../../dist
popd

