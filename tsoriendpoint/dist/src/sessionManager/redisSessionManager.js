"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redisConfig_1 = __importDefault(require("../models/redisConfig"));
var redis = require("redis");
class RedisSessionManager {
    constructor() {
        this.connection = {};
    }
    init(config) {
        this.config = new redisConfig_1.default(config);
        return new Promise((res, rej) => {
            var c = redis.createClient(this.config.port, this.config.host);
            this.connection = c;
            c.on('connect', function () {
                console.log('Redis -> redis connected ' + this.config.host);
                c.select(this.config.db, function (err, res) {
                    console.log('Redis -> redis on db : ' + this.config.db);
                    res({});
                });
            });
        });
    }
    setSession(token, value) {
        return new Promise((res, rej) => {
            this.connection.set(token, JSON.stringify(value), (err, data) => {
                if (err)
                    return rej(err);
                return res(data);
            });
        });
    }
    getSession(token) {
        return new Promise((res, rej) => {
            this.connection.get(token, (err, data) => {
                if (err)
                    return rej(err);
                return res(JSON.parse(data));
            });
        });
    }
}
exports.default = RedisSessionManager;
//# sourceMappingURL=redisSessionManager.js.map