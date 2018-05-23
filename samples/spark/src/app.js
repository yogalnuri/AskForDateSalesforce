/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
'use strict';

const apiai = require('apiai');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const SparkBot = require('./sparkbot');
const SparkBotConfig = require('./sparkbotconfig');

const REST_PORT = (process.env.PORT || 5000);
const DEV_CONFIG = process.env.DEVELOPMENT_CONFIG == 'true';

const APP_NAME = process.env.APP_NAME;
const APIAI_ACCESS_TOKEN = process.env.APIAI_ACCESS_TOKEN;
const APIAI_LANG = process.env.APIAI_LANG;

const SPARK_ACCESS_TOKEN = process.env.SPARK_ACCESS_TOKEN;

let baseUrl = "";
if (APP_NAME) {
    // Heroku case
    baseUrl = `https://${APP_NAME}.herokuapp.com`;
} else {
    console.error('Set up the url of your service here and remove exit code!');
    process.exit(1);
}

let bot;

// console timestamps
require('console-stamp')(console, 'yyyy.mm.dd HH:MM:ss.l');

function startBot() {

    console.log("Starting bot");

    const botConfig = new SparkBotConfig(
        APIAI_ACCESS_TOKEN,
        APIAI_LANG,
        SPARK_ACCESS_TOKEN);

    botConfig.devConfig = DEV_CONFIG;

    bot = new SparkBot(botConfig, baseUrl + '/webhook');

    bot.loadProfile()
        .then((profile) => {
            bot.setProfile(profile);
            bot.setupWebhook();
        })
        .catch((err) => {
            console.error(err);
        });
}

startBot();

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    console.log('POST webhook');

    try {
        if (bot) {
            bot.processMessage(req, res);
        }
    } catch (err) {
        return res.status(400).send('Error while processing ' + err.message);
    }
});

app.listen(REST_PORT, () => {
    console.log('Rest service ready on port ' + REST_PORT);
});