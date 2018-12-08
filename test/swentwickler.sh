# this file has 10 tests

source test/functions.sh
TEST_SUCCESS_COUNTER=0

echo -e "$(red --------------- WITHOUT PRE-EXISTING EMPLOYEES ---------------)"

echo -e "$(blue '----> Testing GET http://localhost:8080/swentwickler - return empty list of swentwickler')"
RESPONSE=$(curl -sS "${H1}" "${H2}" "${GET}" "${URL}")
testSuccess ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER+$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n$(blue '----> Testing GET http://localhost:8080/swentwickler/5 - ressource was not found')"
RESPONSE=$(curl -sS "${H1}" "${H2}" "${GET}" "${URL}/5")
testError ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER+$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n$(blue '----> Testing DELETE http://localhost:8080/swentwickler/5 - delete not allowable')"
RESPONSE=$(curl -sS "${H1}" "${H2}" "${DELETE}" "${URL}/5")
testError ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER+$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n$(blue '----> Testing PUT http://localhost:8080/swentwickler/5 - update not allowable')"
RESPONSE=$(curl -sS "${H1}" "${H2}" "${PUT}" "${URL}/5" -d '{"type":2,"first_name":"Jan Andre","last_name":"Schloesser"}')
testError ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER+$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n$(blue '----> Testing POST http://localhost:8080/swentwickler - create allowable')"
RESPONSE=$(curl -sS "${H1}" "${H2}" "${POST}" "${URL}" -d '{"type":2,"first_name":"Jan Andre","last_name":"Schloesser"}')
testSuccess ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER+$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi




echo -e "\n\n$(red --------------- WITH PRE-EXISTING EMPLOYEES ---------------)"

echo -e "$(blue '----> Testing GET http://localhost:8080/swenwickler - all qs employees')"
RESPONSE=$(curl -sS "${H1}" "${H2}" "${GET}" "${URL}")
testSuccess ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER+$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n$(blue '----> Testing GET http://localhost:8080/swentwickler/1 - show qs employee with 1')"
RESPONSE=$(curl -sS "${H1}" "${H2}" "${GET}" "${URL}/1")
testSuccess ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER+$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n$(blue '----> Testing PUT http://localhost:8080/swentwickler/1 - update allowable')"
RESPONSE=$(curl -sS "${H1}" "${H2}" "${PUT}" "${URL}/1" -d '{"type":2,"first_name":"Jan Andre","last_name":"Schloesser"}')
testSuccess ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER+$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n$(blue '----> Testing DELETE http://localhost:8080/swentwickler/1 - delete qs employee with 1')"
RESPONSE=$(curl -sS "${H1}" "${H2}" "${DELETE}" "${URL}/1")
testSuccess ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER+$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n$(blue '----> Testing GET http://localhost:8080/swentwickler - no qs employees with id 1')"
RESPONSE=$(curl -sS "${H1}" "${H2}" "${GET}" "${URL}/1")
testError ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER+$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi


echo -e "\n\n$(red --------------- TEST RESULT ---------------)"
if [[ $TEST_SUCCESS_COUNTER -eq 10 ]]
then
    echo -e "$(green '-----------------------------------------------------')"
    echo -e "$(green '!!!!!! ALL TESTS OF SW-Mitarbeiter SUCCESSFUL !!!!!!!')"
    echo -e "$(green '-----------------------------------------------------')"
else
    echo -e "$(red '\n-----------------------------------------------------')"
    echo -e "$(red '!!!!!! NOT ALL TESTS OF SW-Mitarbeiter SUCCESSFUL !!!!!!!')"
    echo -e "$(red '-----------------------------------------------------')"
fi

echo -e "\n\n"

exit $TEST_SUCCESS_COUNTER