"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const endpointConnection_1 = require("./models/endpointConnection");
const expressIndex_1 = __importDefault(require("./services/expressIndex"));
class TsOriEndpoint {
    constructor() {
        this.name = 'endpoint';
        this.expressList = [];
    }
    jsonConfig(config) {
        this.config = config;
        for (var connection of this.config.connections) {
            if (connection.type == endpointConnection_1.EndpointConnectionType.Soucket) {
            }
            else {
                this.expressList.push(new expressIndex_1.default(connection));
            }
        }
        return;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            for (var express of this.expressList) {
                yield express.init();
            }
            return;
        });
    }
    restart() {
        throw new Error('Method not implemented.');
    }
    stop() {
        throw new Error('Method not implemented.');
    }
}
exports.default = TsOriEndpoint;
//# sourceMappingURL=index.js.map