"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtSessionManager_1 = __importDefault(require("../sessionManager/jwtSessionManager"));
const ramSessionManager_1 = __importDefault(require("../sessionManager/ramSessionManager"));
const redisSessionManager_1 = __importDefault(require("../sessionManager/redisSessionManager"));
const origamicore_1 = require("origamicore");
const errorMessages_1 = __importDefault(require("../models/errorMessages"));
const authorization_1 = __importDefault(require("../modules/authorization"));
const uploadFileModel_1 = __importDefault(require("../models/uploadFileModel"));
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var formidable = require('formidable');
var http = require('http');
var https = require('https');
class ExpressIndex {
    constructor(config) {
        this.config = config;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            var app = express();
            this.setPublic(app, this.config);
            this.setUrlParser(app, this.config);
            yield this.setSessionManager(app, this.config);
            this.setCrossDomain(app, this.config);
            this.runServer(app, this.config);
            var self = this;
            app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                var data = this.reqToDomain(req);
                if (!data)
                    return;
                var session = req.session;
                let isAuthz = false;
                var route = origamicore_1.Router.getRouteData(data.domain, data.service);
                if (!route) {
                    return self.sendData(res, 404, { message: errorMessages_1.default.notFound });
                }
                if (this.config.authz) {
                    try {
                        isAuthz = yield self.checkAuthz(session, data, self.config.authz);
                    }
                    catch (exp) {
                        console.log('exp>>', exp);
                    }
                }
                else {
                    isAuthz = authorization_1.default.checkAuthorization(data.domain, data.service, session);
                }
                if (!isAuthz)
                    return self.sendData(res, 403, { message: errorMessages_1.default.authz });
                var upload = yield self.checkUpload(req, data, self);
                if (!upload)
                    return self.sendData(res, 413, { message: errorMessages_1.default.upload });
                try {
                    var responseData = yield origamicore_1.Router.runExternal(data.domain, data.service, new origamicore_1.MessageModel(data.body), data.path, req.method);
                    var token = yield this.setSession(req, responseData);
                    var addedResponse = responseData === null || responseData === void 0 ? void 0 : responseData.addedResponse;
                    if (addedResponse) {
                        if (responseData.addedResponse.redirect)
                            return res.redirect(responseData.addedResponse.redirect);
                        if (responseData.addedResponse.directText)
                            return self.sendData(res, 200, responseData.addedResponse.directText);
                        if (addedResponse.directFileDownload) {
                            fs.readFile(addedResponse.directFileDownload, function (err, downloadData) {
                                if (responseData.addedResponse.type) {
                                    res.set('Content-Type', responseData.addedResponse.type);
                                }
                                return self.sendData(res, 200, downloadData);
                            });
                            return;
                        }
                    }
                    if (responseData.error) {
                        return self.sendData(res, 500, responseData.error);
                    }
                    var resp = (_a = responseData.response) !== null && _a !== void 0 ? _a : {};
                    if (token)
                        resp.token = token;
                    return self.sendData(res, 200, resp);
                }
                catch (exp) {
                    console.log('exp>>', exp);
                    return self.sendData(res, 500, { message: exp });
                }
            }));
        });
    }
    setSession(req, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var token = req.header('authorization');
            var sessionData = req.session;
            if (data === null || data === void 0 ? void 0 : data.session) {
                if (!sessionData)
                    sessionData = {};
                for (var name in data.session) {
                    if (data.session[name] == null)
                        delete sessionData[name];
                    else {
                        sessionData[name] = data.session[name];
                    }
                }
                delete data.session;
                var key = yield this.sessionManager.setSession(token, sessionData);
                return key;
            }
            return "";
        });
    }
    getUploadFile(req, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                var form = new formidable.IncomingForm();
                if (data.maxUploadSize) {
                    form.options.maxFileSize = data.maxUploadSize;
                    form.options.maxFieldsSize = data.maxUploadSize;
                }
                form.parse(req, function (err, fields, files) {
                    if (err)
                        return rej(err);
                    var response = fields;
                    for (var a in files) {
                        var fileData = files[a];
                        var file = new uploadFileModel_1.default({
                            path: fileData.filepath,
                            name: fileData.originalFilename,
                            size: fileData.size,
                            type: fileData.mimetype,
                        });
                        response[a] = file;
                    }
                    res(response);
                });
            }));
        });
    }
    checkAuthz(session, dt, authz) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                if (session && session.superadmin)
                    return res(true);
                try {
                    var data = origamicore_1.Router.runInternal(authz.domain, 'checkRole', new origamicore_1.MessageModel({ data: { domain: dt.domain, service: dt.service }, session: session }));
                    res(!!data);
                }
                catch (exp) {
                    return res(false);
                }
            }));
        });
    }
    checkUpload(req, data, self) {
        return __awaiter(this, void 0, void 0, function* () {
            var route = origamicore_1.Router.getRouteData(data.domain, data.service);
            if (route && route.maxUploadSize != null) {
                try {
                    data.body.data = yield self.getUploadFile(req, route);
                }
                catch (exp) {
                    console.log('exp>>', exp);
                    return false;
                }
            }
            return true;
        });
    }
    sendData(res, status, data) {
        return res.status(status).send(data);
    }
    reqToDomain(req) {
        var url_parts = url.parse(req.url, true);
        var seperate = url_parts.pathname.split('/');
        // if(!seperate || seperate.length!=3)
        // {
        //     self.sendData(res,200,{m:'endpoint001'})
        //     return
        // } 
        var session = req.session;
        var body = {
            session: session,
        };
        if (req.method == 'GET') {
            body.data = {};
            for (var a in url_parts.query)
                body.data[a] = url_parts.query[a];
            if (req.body)
                for (var a in req.body) {
                    body.data[a] = req.body[a];
                }
        }
        else {
            body.data = req.body;
            var bx = url_parts.query;
            for (var a in bx) {
                body.data[a] = bx[a];
            }
        }
        var returnData = {
            domain: seperate[1],
            service: seperate[2],
            path: url_parts.pathname,
            body
        };
        return returnData;
    }
    runServer(app, config) {
        var pr = config.protocol;
        if (pr.type == "http") {
            var server = http.createServer(app);
            server.listen(pr.port);
            console.log("\x1b[32m%s\x1b[0m", 'http run at port ' + pr.port);
        }
        if (pr.type == "https") {
            var privateKey = fs.readFileSync(pr.key, 'utf8');
            var certificate = fs.readFileSync(pr.crt, 'utf8');
            var credentials = { key: privateKey, cert: certificate };
            var server = https.createServer(credentials, app);
            server.listen(pr.port);
            console.log("\x1b[32m%s\x1b[0m", 'http run at port ' + pr.port);
        }
    }
    setUrlParser(app, config) {
        var _a, _b;
        if ((_a = config.limit) === null || _a === void 0 ? void 0 : _a.bodyLimit)
            app.use(bodyParser.json({ limit: config.limit.bodyLimit * 1026 * 1024 }));
        else
            app.use(bodyParser.json());
        if ((_b = config.limit) === null || _b === void 0 ? void 0 : _b.urlLimit)
            app.use(bodyParser.urlencoded({ limit: config.limit.urlLimit * 1026 * 1024, extended: true }));
        else
            app.use(bodyParser.urlencoded({ extended: true }));
    }
    setSessionManager(app, config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (config.protocol.redisConfig) {
                this.sessionManager = new redisSessionManager_1.default();
                yield this.sessionManager.init(config.protocol.redisConfig);
            }
            else if (config.protocol.jwtConfig) {
                this.sessionManager = new jwtSessionManager_1.default();
                yield this.sessionManager.init(config.protocol.jwtConfig);
            }
            else {
                this.sessionManager = new ramSessionManager_1.default();
                yield this.sessionManager.init({});
            }
            app.use((req, res, next) => {
                var token = req.header('authorization');
                this.sessionManager.getSession(token).then((data) => {
                    req.session = data;
                    next();
                }).catch(() => {
                    next();
                });
            });
        });
    }
    setPublic(app, config) {
        for (var folder of config.publicFolder) {
            app.use(express.static(folder));
        }
    }
    setCrossDomain(app, config) {
        if (!config.crossDomain)
            return;
        for (var cross of config.crossDomain) {
            app.use(function (req, res, next) {
                if ('OPTIONS' == req.method) {
                    if (cross == '*')
                        res.header('Access-Control-Allow-Origin', req.headers.origin);
                    else
                        res.header('Access-Control-Allow-Origin', cross);
                    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
                    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
                    res.setHeader('Access-Control-Allow-Credentials', true);
                    res.status(200).send('OK');
                }
                else {
                    if (cross == '*')
                        res.header('Access-Control-Allow-Origin', req.headers.origin);
                    else
                        res.header('Access-Control-Allow-Origin', cross);
                    res.setHeader('Access-Control-Allow-Credentials', true);
                    next();
                }
            });
        }
    }
}
exports.default = ExpressIndex;
//# sourceMappingURL=expressIndex.js.map