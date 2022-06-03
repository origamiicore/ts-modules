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
Object.defineProperty(exports, "__esModule", { value: true });
var session = {};
class RamsSessionManager {
    init(config) {
        return;
    }
    getRandomToken() {
        var text = 'wertyuioplkjhgfdsazxcvbnm1234567890';
        var str = '';
        for (var i = 0; i < 30; i++) {
            var rndNumber = Math.floor(Math.random() * text.length);
            str += text[rndNumber];
        }
        return str;
    }
    setSession(token, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                token = this.getRandomToken();
            }
            try {
                session[token] = { value };
            }
            catch (exp) {
                console.log(exp);
            }
            return token;
        });
    }
    getSession(token) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = session[token]) === null || _a === void 0 ? void 0 : _a.value;
        });
    }
}
exports.default = RamsSessionManager;
//# sourceMappingURL=ramSessionManager.js.map