"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const origamits_1 = require("origamits");
const connectionProtocol_1 = __importDefault(require("../src/models/connectionProtocol"));
const endpointConfig_1 = __importDefault(require("../src/models/endpointConfig"));
const endpointConnection_1 = __importStar(require("../src/models/endpointConnection"));
const profileConfig_1 = __importDefault(require("./profileService/models/profileConfig"));
var path = require('path');
exports.default = new origamits_1.ConfigModel({
    packageConfig: [
        new endpointConfig_1.default({
            id: '1',
            type: 'module',
            name: 'endpoint',
            connections: [
                new endpointConnection_1.default({
                    type: endpointConnection_1.EndpointConnectionType.Express,
                    publicFolder: [path.join(__dirname, '../../sample/public')],
                    protocol: new connectionProtocol_1.default({
                        type: 'http',
                        port: 9201
                    })
                })
            ]
        }),
        new profileConfig_1.default({
            id: '2',
            type: 'service',
            name: 'profile',
            readOnley: false
        })
    ]
});
//# sourceMappingURL=config.js.map