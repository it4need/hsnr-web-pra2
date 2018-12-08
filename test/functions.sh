green() { echo "$(tput setaf 2)$*$(tput setaf 7)"; }
red() { echo "$(tput setaf 1)$*$(tput setaf 7)"; }
blue() { echo "$(tput setaf 4)$*$(tput setaf 7)"; }
black() { echo "$(tput setaf 0)$*$(tput setaf 7)"; }

H1="-HContent-Type: application/json"
H2="-HEnv: testing"
GET='-X GET'
POST='-X POST'
PUT='-XPUT'
DELETE='-X DELETE'
URL='http://localhost:8080/swentwickler'

function testSuccess {
     JQ="$(echo $(echo $@) | jq 'if .status == "success" then 1 else 0 end')"
     if [[ $JQ -eq 1 ]]
     then
          echo -e "$(green 'TEST SUCCESSFUL'.)"
          return 1
     else
          echo -e $(red 'TEST FAILED!')
          return 0
     fi
}

function testError {
     JQ="$(echo $(echo $@) | jq 'if .status == "error" then 1 else 0 end')"
     if [[ $JQ -eq 1 ]]
     then
          echo -e "$(green 'TEST SUCCESSFUL'.)"
          return 1
     else
          echo -e $(red 'TEST FAILED!')
          return 0
     fi
}