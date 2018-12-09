#!/bin/bash
source test/functions.sh

clear
echo $(red Gültigkeitsdatum: $(date))
chmod -R 777 test

FAILED_TESTS=0 # must be equal to 0 for success



rm -Rf data_test
echo -e "$(black '#######################################################')"
echo -e "$(black '################### QS-EMPLOYEES ######################')"
echo -e "$(black '#######################################################')\n"
./test/qsmitarbeiter.sh $1
FAILED_TESTS=$((FAILED_TESTS+$?))

rm -Rf data_test
echo -e "$(black '#######################################################')"
echo -e "$(black '################### SW-EMPLOYEES ######################')"
echo -e "$(black '#######################################################')\n"
./test/swentwickler.sh $1
FAILED_TESTS=$((FAILED_TESTS+$?))

rm -Rf data_test
echo -e "$(black '#######################################################')"
echo -e "$(black '################### BUG-CATEGORY  #####################')"
echo -e "$(black '#######################################################')\n"
./test/bugcategory.sh $1
FAILED_TESTS=$((FAILED_TESTS+$?))

rm -Rf data_test
echo -e "$(black '#######################################################')"
echo -e "$(black '################### BUG-CAUSE  ########################')"
echo -e "$(black '#######################################################')\n"
./test/bugcause.sh $1
FAILED_TESTS=$((FAILED_TESTS+$?))









rm -Rf data_test
echo -e "\n\n$(red --------------- FINAL TEST RESULT ---------------)"
if [[ $FAILED_TESTS -eq 0 ]]
then
    echo -e "$(green '-----------------------------------------------------')"
    echo -e "$(green '!!!!!!!!! COMPLETE TEST SUITE WAS SUCCESSFUL !!!!!!!!')"
    echo -e "$(green '-----------------------------------------------------')"
else
    echo -e "$(red '-----------------------------------------------------')"
    echo -e "$(red '!!!!!!!!!!!!! COMPLETE TEST SUITE FAILED !!!!!!!!!!!!')"
    echo -e "$(red '-----------------------------------------------------')"
fi