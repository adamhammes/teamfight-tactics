mkdir -p ../src/images/champion-icons/
rm -f ../src/images/champion-icons/*
mogrify -format jpg -path ../src/images/champion-icons/ champion-icons/*.png

mkdir -p ../src/images/item-icons/
rm -f ../src/images/item-icons/*
mogrify -format jpg -path ../src/images/item-icons/ item-icons/*.png
