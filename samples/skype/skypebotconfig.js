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

module.exports = class SkypeBotConfig {

    get apiaiAccessToken() {
        return this._apiaiAccessToken;
    }

    set apiaiAccessToken(value) {
        this._apiaiAccessToken = value;
    }

    get apiaiLang() {
        return this._apiaiLang;
    }

    set apiaiLang(value) {
        this._apiaiLang = value;
    }

    get skypeBotId() {
        return this._skypeBotId;
    }

    set skypeBotId(value) {
        this._skypeBotId = value;
    }

    get skypeAppId() {
        return this._skypeAppId;
    }

    set skypeAppId(value) {
        this._skypeAppId = value;
    }

    get skypeAppSecret() {
        return this._skypeAppSecret;
    }

    set skypeAppSecret(value) {
        this._skypeAppSecret = value;
    }

    get devConfig() {
        return this._devConfig;
    }

    set devConfig(value) {
        this._devConfig = value;
    }

    constructor(apiaiAccessToken, apiaiLang, appId, appSecret) {
        this._apiaiAccessToken = apiaiAccessToken;
        this._apiaiLang = apiaiLang;
        this._skypeAppId = appId;
        this._skypeAppSecret = appSecret;
    }

    toPlainDoc() {
        return {
            apiaiAccessToken: this._apiaiAccessToken,
            apiaiLang: this._apiaiLang,
            skypeAppId: this._skypeAppId,
            skypeAppSecret: this._skypeAppSecret
        }
    }

    static fromPlainDoc(doc){
        return new SkypeBotConfig(
            doc.apiaiAccessToken,
            doc.apiaiLang,
            doc.skypeAppId, 
            doc.skypeAppSecret);
    }
};