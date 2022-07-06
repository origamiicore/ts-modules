"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const origamicore_1 = require("origamicore");
const __1 = require("..");
const profileConfig_1 = __importDefault(require("./profileService/models/profileConfig"));
var path = require('path');
exports.default = new origamicore_1.ConfigModel({
    defaultMethod: origamicore_1.HttpMethod.Get,
    packageConfig: [
        new __1.EndpointConfig({
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
            readOnley: false
        })
    ]
});
//# sourceMappingURL=config.js.map