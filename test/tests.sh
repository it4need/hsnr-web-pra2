#!/bin/bash
source test/functions.sh

clear
echo $(red Gültigkeitsdatum: $(date))
chmod -R 777 test

TEST_COUNTS=20
TEST_COUNTS_TEST=0



rm -Rf data_test
echo -e "$(black '#######################################################')"
echo -e "$(black '################### QS-Mitarbeiter ####################')"
echo -e "$(black '#######################################################')\n"
./test/qsmitarbeiter.sh $1
TEST_COUNTS_TEST=$((TEST_COUNTS_TEST+$?))

rm -Rf data_test
echo -e "$(black '#######################################################')"
echo -e "$(black '################### SW-Mitarbeiter ####################')"
echo -e "$(black '#######################################################')\n"
./test/swentwickler.sh $1
TEST_COUNTS_TEST=$((TEST_COUNTS_TEST+$?))











rm -Rf data_test
echo -e "\n\n$(red --------------- FINAL TEST RESULT ---------------)"
if [[ $TEST_COUNTS_TEST -eq $TEST_COUNTS ]]
then
    echo -e "$(green '-----------------------------------------------------')"
    echo -e "$(green '!!!!!!!!! COMPLETE TEST SUITE WAS SUCCESSFUL !!!!!!!!')"
    echo -e "$(green '-----------------------------------------------------')"
else
    echo -e "$(red '-----------------------------------------------------')"
    echo -e "$(red '!!!!!!!!!!!!! COMPLETE TEST SUITE FAILED !!!!!!!!!!!!')"
    echo -e "$(red '-----------------------------------------------------')"
fi