"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const origamicore_1 = require("origamicore");
let ProfileModel = class ProfileModel extends origamicore_1.IOriModel {
    constructor(fields) {
        super();
        if (fields) {
            Object.assign(this, fields);
        }
    }
};
__decorate([
    (0, origamicore_1.OriProps)({})
], ProfileModel.prototype, "firstName", void 0);
__decorate([
    (0, origamicore_1.OriProps)({})
], ProfileModel.prototype, "lastName", void 0);
ProfileModel = __decorate([
    (0, origamicore_1.OriModel)()
], ProfileModel);
exports.default = ProfileModel;
//# sourceMappingURL=profileModel.js.map