"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointConnectionType = void 0;
class EndpointConnectionType {
}
exports.EndpointConnectionType = EndpointConnectionType;
EndpointConnectionType.Soucket = 'socket';
EndpointConnectionType.Express = 'express';
class EndpointConnection {
    constructor(fields) {
        this.publicFolder = [];
        this.crossDomain = [];
        if (fields)
            Object.assign(this, fields);
    }
}
exports.default = EndpointConnection;
//# sourceMappingURL=endpointConnection.js.map