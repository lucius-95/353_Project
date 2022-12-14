## This is the project for CMPT 353

## Teams:

- Dillon Vu
- Lucius Ho
- Kyle Holtby
- Hasin Raihan



## Description about this project:

to create user first create user with email dillon@yahoo.com.
This account is the only account allowed to create unique company by default.
this account can create unique company and owner of that company.

# Software Stack for this CMPT353 project:
- server side using NodeJs with express
- client side using HTML, CSS and React, Redux
- App Database using MongoDB
- Team Database using mySQL
- cloud storage using AWS S3
- ELK stack (Elasticsearch, Logstash, and Kibana) provides centralized logging in order to identify problems with servers or applications
- logstash for logger
- microserver architecture with Java Spring Cloud:
  - Spring cloud gateway server :
    - loadbalancing API call, filter API call, authenticate gateway to project back end 
  - Spring cloud config server:
    - centralize configuration service to make is fast and easy to change work environment
    - connect to github account with yml files for configuration
  - Spring cloud eureka server: 
    - discovery service hold information of port and server of instances.
    - loadbalancing instance,health check and replance unhealthy instances.

## To Start first you need to have Docker set up. for more info
## please visit https://www.docker.com/ to install docker:
## install maven for java

# before running docker make sure you increase your memory and resources!
# Run with docker command:

brew install maven
docker-compose up

# To run on client side run on:
http://localhost:3000

## side server with back end monitoring:
# eureka server:
http://localhost:8081
# configuration server
http://localhost:8082

# gateway API call 
http://localhost:7072/actuator/gateway/routes

# Zipkin trace for network performance
http://localhost:9411/zipkin/
# kibana
http://localhost:5601/app/kibana

# reset the server if it not working!
# if an error show up for java file , run :
 mvn clean package
