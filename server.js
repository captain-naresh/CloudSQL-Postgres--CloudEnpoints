/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// Require process, so we can mock environment variables
const process = require('process');

// [START gae_flex_postgres_app]
const express = require('express');
const Knex = require('knex');
const crypto = require('crypto');

const app = express();
app.enable('trust proxy');

const connect = () => {
  // [START gae_flex_postgres_connect]
  console.log(process.env.INSTANCE_CONNECTION_NAME);
  console.log(process.env.NODE_ENV);
  const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
  };

  if (
    process.env.INSTANCE_CONNECTION_NAME &&
    process.env.NODE_ENV === 'production'
  ) {
    config.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  }

  // Connect to the database
  const knex = Knex({
    client: 'pg',
    connection: config,
  });
  // [END gae_flex_postgres_connect]

  return knex;
};

const knex = connect();
console.log("knex valus is ",knex);

//app.get('/ilo/ILOOrder/V1/order/count', getOrderCounts);
app.get('/order/count', getOrderCounts);

async function getOrderCounts(req, res){
try{
    console.log("1");
const countsDetails = await queryPostgreTable(knex);
console.log("11",countsDetails);
if(countsDetails === undefined || countsDetails.length == 0){
    res.status(200).set('Content-Type', 'application/json').json('no records found !!!').end();
}
else{ res.status(200).set('Content-Type', 'application/json').send(countsDetails).end();}
}
catch (err) {
    console.error(err);
    res.status(500).send(err);
    return Promise.reject(err);
}
}

async function queryPostgreTable(knex) {
    return await knex
    .select('*')
    .from('ilo.order_t');
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_flex_postgres_app]

module.exports = app;
