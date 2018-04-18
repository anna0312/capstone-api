#!/bin/bash

API="http://localhost:4741"
URL_PATH="/places"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"

echo
# ID=5ad65ba008e61b2b01f8eb69 TOKEN=0N5DpVxWYv5OZgLe28yFQa1ERls2mrNyvUP6LsIp2es=--hHIR3TrgZQ9OWUKmjPIbNfHTp6A1YUfZa6LepMjk0eg= sh scripts/places/destroy.sh
