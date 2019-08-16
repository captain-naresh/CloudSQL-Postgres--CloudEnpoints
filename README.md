# CloudSQL-Postgres--CloudEnpoints
Connect to postgres db through node js api + managing the api via Swagger Endpoints


Sequence of task -

####################################
1. Order.yaml --> Cloud Enpoint open API specification
2. Server.js --> Node js back end code for querying the cloud SQL.
3. app.flexible.yaml --> configuration of cloud sql - postgres database to make connection
4. package.json --> dependencies file, which file invokes and when.
####################################


This api gives an Swagger 2.0 endpoint interface to query available orders from Postgres Database using Cloud SQL.

Service is hosted at URL = https://captain-xxx.appspot.com/

It is developed in NodeJS10 and is deployed on Google App Engine Flexible env.

The service offers following functionalities thru the Swagger APIs-

Retrieve an existing people(customer) entity using people(customer) id


Both API calls are query based.

POST https://captain-xxx.appspot.com/peopleDetails
Request Header: Content-Type: application/json

Request Payload in query parameter:

{ "Id":2, "Name":"Naresh", "Age":30, "Blood_Group":"o++", "Gender":"M", "Department":"IT", "DOB":"1989-05-29", "Marital_Status":true }

Response body

[ { "Id": "2", "Name": "Naresh", "Age": "30", "Blood_Group": "o+", "Gender": "M", "Department": "IT", "DOB": "1989-05-29", "Marital_Status": "true" } ]

curl -X POST "https://captain-xxx.appspot.com/peopleDetails?Id=2&Name=Naresh&Age=30&Blood_Group=o%2B&Gender=M&Department=IT&DOB=1989-05-29&Marital_Status=true" -H "accept: application/json"

Response headers

alt-svc: quic=":443"; ma=2592000; v="46,43,39" cache-control: no-cache connection: close content-encoding: gzip content-length: 132 content-type: application/json; charset=utf-8 date: Mon, 22 Jul 2019 09:59:14 GMT etag: W/"84-TZgqD2x7yhPOG74jKsXRMU1Coys" expires: -1 server: nginx/1.14.0 + Phusion Passenger 5.3.4 status: 200 OK vary: Accept-Encoding via: 1.1 google x-powered-by: Express, Phusion Passenger 5.3.4

Request duration

751 ms

GET https://captain-xxx.appspot.com/peopleDetails
Request Header: Content-Type: application/json

Request Payload in query parameter:

{ "Id":2 }

Response body

[ { "Id": "2", "Name": "Naresh", "Age": 30, "Blood_Group": "o+", "Gender": "M", "Department": "IT", "DOB": { "value": "1989-05-29" }, "Marital_Status": true } ]

curl -X GET "https://captain-xxx.appspot.com/peopleDetails?Id=2" -H "accept: application/json"

Response headers

alt-svc: quic=":443"; ma=2592000; v="46,43,39" cache-control: no-cache connection: close content-encoding: gzip content-length: 141 content-type: application/json; charset=utf-8 date: Mon, 22 Jul 2019 13:43:27 GMT etag: W/"8a-KGWrMxw5t2+CDEdZ1Wp16TVPoFk" expires: -1 server: nginx/1.14.0 + Phusion Passenger 5.3.4 status: 200 OK vary: Accept-Encoding via: 1.1 google x-powered-by: Express, Phusion Passenger 5.3.4

Request duration

2041 ms

How to use it -

There are two method to use it -

via Swagger 2.0 yaml implementaion. - for Swagger 2.0, copy the openapi-appengine.yaml source code and import it into any swagger hub utility service.

via any testing utility. - use soap ui or postman to testing the below endpoint for both the operations as per standard.

API Interface url -

post - https://captain-xxx.appspot.com/peopleDetails?Id=2&Name=Naresh&Age=30&Blood_Group=o%2B&Gender=M&Department=IT&DOB=1989-05-29&Marital_Status=true

get - https://captain-007.appspot.com/peopleDetails?Id=2

