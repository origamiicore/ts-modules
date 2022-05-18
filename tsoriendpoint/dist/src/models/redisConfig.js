"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RedisConfig {
    constructor(fields) {
        this.port = 6379;
        this.host = 'localhost';
        this.db = 0;
        this.secExpireTime = 0;
        if (fields)
            Object.assign(this, fields);
    }
}
exports.default = RedisConfig;
//# sourceMappingURL=redisConfig.js.map