#!/bin/sh

API="http://localhost:4741"
URL_PATH="/places"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo

# TOKEN=0N5DpVxWYv5OZgLe28yFQa1ERls2mrNyvUP6LsIp2es=--hHIR3TrgZQ9OWUKmjPIbNfHTp6A1YUfZa6LepMjk0eg= sh scripts/places/index.sh
