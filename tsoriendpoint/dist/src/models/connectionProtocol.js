"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConnectionProtocol {
    constructor(fields) {
        this.socketProtocol = 'echo-protocol';
        if (fields)
            Object.assign(this, fields);
    }
}
exports.default = ConnectionProtocol;
//# sourceMappingURL=connectionProtocol.js.map