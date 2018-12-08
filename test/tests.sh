#!/usr/bin/env bash
green() { echo "$(tput setaf 2)$*$(tput setaf 7)"; }
red() { echo "$(tput setaf 1)$*$(tput setaf 7)"; }

clear
echo $(red Gültigkeitsdatum: $(date))
chmod -R 777 test

rm -Rf data_test
echo -e "$(green '#######################################################')"
echo -e "$(green '################### QS-Mitarbeiter ####################')"
echo -e "$(green '#######################################################')\n"
./test/qsmitarbeiter.sh

rm -Rf data_test
echo -e "$(green '#######################################################')"
echo -e "$(green '################### SW-Mitarbeiter ####################')"
echo -e "$(green '#######################################################')\n"
./test/swmitarbeiter.sh