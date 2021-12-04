#! /bin/bash

brew install maven
mvn clean package
docker-compose up --build
