"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JwtConfig {
    constructor(fields) {
        this.privateKey = '';
        this.publicKey = '';
        this.algorithm = '';
        this.secExpireTime = 0;
        if (fields)
            Object.assign(this, fields);
    }
}
exports.default = JwtConfig;
//# sourceMappingURL=jwtConfig.js.map