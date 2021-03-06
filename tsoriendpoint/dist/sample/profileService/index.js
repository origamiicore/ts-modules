"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const origamicore_1 = require("origamicore");
const profileModel_1 = __importDefault(require("./models/profileModel"));
let ProfileService = class ProfileService {
    constructor() {
        this.name = 'profile';
    }
    jsonConfig(moduleConfig) {
        return;
    }
    start() {
        return;
    }
    restart() {
        return;
    }
    stop() {
        return;
    }
    testRoute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return { id };
        });
    }
    getProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            return new profileModel_1.default({ firstName: 'vahid', lastName: 'hossaini' });
        });
    }
    login(name) {
        return __awaiter(this, void 0, void 0, function* () {
            //return name;
            return new origamicore_1.RouteResponse({ session: { userid: name } });
        });
    }
    isLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            //return name;
            return new origamicore_1.RouteResponse({});
        });
    }
    saveProfile(info, session) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('info>', info);
            console.log('session>', session);
        });
    }
};
__decorate([
    (0, origamicore_1.OriService)({ isPublic: true, route: 'test/:id', method: origamicore_1.HttpMethod.Get })
], ProfileService.prototype, "testRoute", null);
__decorate([
    (0, origamicore_1.OriService)({ isPublic: true })
], ProfileService.prototype, "getProfile", null);
__decorate([
    (0, origamicore_1.OriService)({ isPublic: true })
], ProfileService.prototype, "login", null);
__decorate([
    (0, origamicore_1.OriService)()
], ProfileService.prototype, "isLogin", null);
__decorate([
    (0, origamicore_1.OriService)({ isPublic: false }),
    __param(0, (0, origamicore_1.DataInput)({ classType: profileModel_1.default })),
    __param(1, origamicore_1.SessionInput)
], ProfileService.prototype, "saveProfile", null);
ProfileService = __decorate([
    (0, origamicore_1.OriInjectable)({ domain: 'profile' })
], ProfileService);
exports.default = ProfileService;
//# sourceMappingURL=index.js.map