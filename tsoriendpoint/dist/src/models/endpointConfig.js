"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const origamits_1 = require("origamits");
class EndpointConfig extends origamits_1.ModuleConfig {
    constructor(fields) {
        super(fields);
        if (fields)
            Object.assign(this, fields);
        if (!(fields === null || fields === void 0 ? void 0 : fields.id)) {
            this.id = Math.random().toString();
        }
        this.name = 'endpoint';
    }
}
exports.default = EndpointConfig;
//# sourceMappingURL=endpointConfig.js.map