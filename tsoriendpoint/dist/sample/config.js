"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const origamits_1 = require("origamits");
const __1 = require("..");
const profileConfig_1 = __importDefault(require("./profileService/models/profileConfig"));
var path = require('path');
exports.default = new origamits_1.ConfigModel({
    packageConfig: [
        new __1.EndpointConfig({
            id: '1',
            type: 'module',
            name: 'endpoint',
            connections: [
                new __1.EndpointConnection({
                    type: __1.EndpointConnectionType.Express,
                    publicFolder: [path.join(__dirname, '../../sample/public')],
                    protocol: new __1.ConnectionProtocol({
                        type: 'http',
                        port: 9201
                    })
                }),
                new __1.EndpointConnection({
                    type: __1.EndpointConnectionType.Soucket,
                    protocol: new __1.ConnectionProtocol({
                        type: 'http',
                        port: 9202
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