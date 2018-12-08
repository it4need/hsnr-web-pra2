red() { echo "$(tput setaf 1)$*$(tput setaf 7)"; }
blue() { echo "$(tput setaf 4)$*$(tput setaf 7)"; }
echo -e "$(red --------------- NO PRE-EXISTING EMPLOYEES ---------------)"

echo -e "$(blue '----> Testing GET http://localhost:8080/qsmitarbeiter - no content')"
curl -sS \
     --header "Content-type: application/json" \
     --header "Env: testing" \
     --request GET \
     http://localhost:8080/qsmitarbeiter | json

echo -e "\n\n$(blue '----> Testing GET http://localhost:8080/qsmitarbeiter/5 - ressource was not found')"
curl -sS \
     --header "Content-type: application/json"\
     --header "Env: testing" \
     --request GET \
     http://localhost:8080/qsmitarbeiter/5 | json

echo -e "\n\n$(blue '----> Testing DELETE http://localhost:8080/qsmitarbeiter/5 - delete not allowable')"
curl -sS \
     --header "Content-type: application/json" \
     --header "Env: testing" \
     --request DELETE \
     http://localhost:8080/qsmitarbeiter/5 | json

echo -e "\n\n$(blue '----> Testing PUT http://localhost:8080/qsmitarbeiter/5 - update not allowable')"
curl -sS \
     --header "Content-type: application/json" \
     --header "Env: testing" \
     --request PUT \
     --data '{"first_name": "Peter", "last_name": "Paker"}' \
     http://localhost:8080/qsmitarbeiter/5 | json

echo -e "\n\n"
echo -e "$(red --------------- WITH PRE-EXISTING EMPLOYEES ---------------)"

echo -e "$(blue '----> Testing POST http://localhost:8080/qsmitarbeiter/5 - create allowable')"
curl -sS \
     --header "Content-type: application/json" \
     --header "Env: testing" \
     --request POST \
     --data '{"first_name": "Peter", "last_name": "Paker", "type": 1}' \
     http://localhost:8080/qsmitarbeiter | json

echo -e "\n\n$(blue '----> Testing GET http://localhost:8080/qsmitarbeiter - all qs employees')"
curl -sS \
     --header "Content-type: application/json" \
     --header "Env: testing" \
     --request GET \
     http://localhost:8080/qsmitarbeiter | json

echo -e "\n\n$(blue '----> Testing GET http://localhost:8080/qsmitarbeiter/1 - show qs employee with 1')"
curl -sS \
     --header "Content-type: application/json" \
     --header "Env: testing" \
     --request GET \
     http://localhost:8080/qsmitarbeiter/1 | json

echo -e "\n\n$(blue '----> Testing PUT http://localhost:8080/qsmitarbeiter/1 - update allowable')"
curl -sS \
     --header "Content-type: application/json" \
     --header "Env: testing" \
     --request PUT \
     --data '{"first_name": "Peter", "last_name": "Paker"}' \
     http://localhost:8080/qsmitarbeiter/1 | json

echo -e "\n\n$(blue '----> Testing DELETE http://localhost:8080/qsmitarbeiter/1 - delete qs employee with 1')"
curl -sS \
     --header "Content-type: application/json" \
     --header "Env: testing" \
     --request DELETE \
     http://localhost:8080/qsmitarbeiter/1 | json

echo -e "\n\n$(blue '----> Testing GET http://localhost:8080/qsmitarbeiter - no qs employees')"
curl -sS \
     --header "Content-type: application/json" \
     --header "Env: testing" \
     --request GET \
     http://localhost:8080/qsmitarbeiter | json