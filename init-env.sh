pacman -Syu --noconfirm --needed
pacman -Syu --noconfirm --needed
pacman -S ca-certificates --noconfirm --needed
update-ca-trust

pacman -Sl msys  >msys.txt
