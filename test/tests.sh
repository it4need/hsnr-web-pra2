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
./test/qsemployees.sh $1
FAILED_TESTS=$((FAILED_TESTS+$?))

rm -Rf data_test
echo -e "$(black '#######################################################')"
echo -e "$(black '################### SW-EMPLOYEES ######################')"
echo -e "$(black '#######################################################')\n"
./test/swemployees.sh $1
FAILED_TESTS=$((FAILED_TESTS+$?))

rm -Rf data_test
echo -e "$(black '#######################################################')"
echo -e "$(black '################### BUG-CATEGORIES ####################')"
echo -e "$(black '#######################################################')\n"
./test/bugcategories.sh $1
FAILED_TESTS=$((FAILED_TESTS+$?))

rm -Rf data_test
echo -e "$(black '#######################################################')"
echo -e "$(black '################### BUG-CAUSES  #######################')"
echo -e "$(black '#######################################################')\n"
./test/bugcauses.sh $1
FAILED_TESTS=$((FAILED_TESTS+$?))

rm -Rf data_test
echo -e "$(black '#######################################################')"
echo -e "$(black '################### PROJECTS  #########################')"
echo -e "$(black '#######################################################')\n"
./test/projects.sh $1
FAILED_TESTS=$((FAILED_TESTS+$?))


rm -Rf data_test
echo -e "$(black '#######################################################')"
echo -e "$(black '################### COMPONENTS  #######################')"
echo -e "$(black '#######################################################')\n"
./test/components.sh $1
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