#!/bin/sh

gcloud beta functions deploy function\
--entry-point functionEntry \
--trigger-http \
--runtime nodejs16 \
--region australia-southeast1 \
--set-secrets 'USERNAME=username:latest','PASSWORD=password:latest' # bind value from secret manager to env var
