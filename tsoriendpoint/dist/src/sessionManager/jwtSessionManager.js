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
const jwtConfig_1 = __importDefault(require("../models/jwtConfig"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtSessionManager {
    init(config) {
        this.config = new jwtConfig_1.default(config);
        return;
    }
    setSession(token, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var resp = "";
            try {
                resp = jsonwebtoken_1.default.sign(value, this.config.privateKey, { algorithm: this.config.algorithm });
            }
            catch (exp) {
                console.log(exp);
            }
            return resp;
        });
    }
    getSession(token) {
        var self = this;
        return new Promise((res, rej) => {
            jsonwebtoken_1.default.verify(token, self.config.publicKey, function (err, decoded) {
                if (!err) {
                    return res(decoded);
                }
                else
                    return res({});
            });
        });
    }
}
exports.default = JwtSessionManager;
//# sourceMappingURL=jwtSessionManager.js.map