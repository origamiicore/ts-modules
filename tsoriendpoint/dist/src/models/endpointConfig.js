"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const origamits_1 = require("origamits");
class EndpointConfig extends origamits_1.ModuleConfig {
    constructor(fields) {
        super(fields);
        if (fields)
            Object.assign(this, fields);
    }
}
exports.default = EndpointConfig;
//# sourceMappingURL=endpointConfig.js.map