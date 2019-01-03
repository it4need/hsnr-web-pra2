# this file has 10 tests

NAME_OF_TESTS="SW-EMPLOYEES"
H1="-HContent-Type: application/json"
H2="-HEnv: testing"
GET='-X GET'
POST='-X POST'
PUT='-XPUT'
DELETE='-X DELETE'
URL='http://localhost:8080/swentwickler'

source test/functions.sh
TEST_SUCCESS_COUNTER=10


echo -e "$(red --------------- WITHOUT PRE-EXISTING ${NAME_OF_TESTS} ---------------)"

echo -e $(blue "----> Testing GET ${URL} - return empty list of all ressources")
RESPONSE=$(curl -sS "${H1}" "${H2}" "${GET}" "${URL}")
testSuccess ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER-$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n" && echo -e $(blue "----> Testing GET ${URL}/5 - ressource was not found")
RESPONSE=$(curl -sS "${H1}" "${H2}" "${GET}" "${URL}/5")
testError ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER-$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n" && echo -e $(blue "----> Testing DELETE ${URL}/5 - delete not allowable")
RESPONSE=$(curl -sS "${H1}" "${H2}" "${DELETE}" "${URL}/5")
testError ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER-$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n" && echo -e $(blue "----> Testing PUT ${URL}/5 - update not allowable")
RESPONSE=$(curl -sS "${H1}" "${H2}" "${PUT}" "${URL}/5" -d '{"first_name":"Jan Andre","last_name":"Schloesser", "type": 1}')
testError ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER-$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n" && echo -e $(blue "----> Testing POST ${URL} - create allowable")
RESPONSE=$(curl -sS "${H1}" "${H2}" "${POST}" "${URL}" -d '{"first_name":"Jan Andre","last_name":"Schloesser", "type": 1}')
testSuccess ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER-$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi




echo -e "\n\n$(red --------------- WITH PRE-EXISTING ${NAME_OF_TESTS} ---------------)"

echo -e $(blue "----> Testing GET ${URL} - all ressources")
RESPONSE=$(curl -sS "${H1}" "${H2}" "${GET}" "${URL}")
testSuccess ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER-$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n" && echo -e $(blue "----> Testing GET ${URL}/1 - show ressource with 1")
RESPONSE=$(curl -sS "${H1}" "${H2}" "${GET}" "${URL}/1")
testSuccess ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER-$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n" && echo -e $(blue "----> Testing PUT ${URL}/1 - update allowable")
RESPONSE=$(curl -sS "${H1}" "${H2}" "${PUT}" "${URL}/1" -d '{"first_name":"Jan Andre","last_name":"Schloesser"}')
testSuccess ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER-$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n" && echo -e $(blue "----> Testing DELETE ${URL}/1 - delete ressource with 1")
RESPONSE=$(curl -sS "${H1}" "${H2}" "${DELETE}" "${URL}/1")
testSuccess ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER-$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi

echo -e "\n\n" && echo -e $(blue "----> Testing GET ${URL}/1 - no ressource with id 1")
RESPONSE=$(curl -sS "${H1}" "${H2}" "${GET}" "${URL}/1")
testError ${RESPONSE}
TEST_SUCCESS_COUNTER=$(($TEST_SUCCESS_COUNTER-$?))
if [[ "$@" == "-v" ]];then echo -e "\nVerbose:" && echo $(echo $RESPONSE) | json;fi


echo -e "\n\n$(red --------------- TEST RESULT ---------------)"
if [[ $TEST_SUCCESS_COUNTER -eq 0 ]]
then
    echo -e "$(green '-----------------------------------------------------')"
    echo -e $(green "!!!!!! ALL TESTS OF ${NAME_OF_TESTS} SUCCESSFUL !!!!!!!")
    echo -e "$(green '-----------------------------------------------------')"
else
    echo -e "$(red '\n-----------------------------------------------------')"
    echo -e $(red "!!!!!! NOT ALL TESTS OF ${NAME_OF_TESTS} SUCCESSFUL !!!!!!!")
    echo -e "$(red '-----------------------------------------------------')"
fi

echo -e "\n\n"

exit $TEST_SUCCESS_COUNTER