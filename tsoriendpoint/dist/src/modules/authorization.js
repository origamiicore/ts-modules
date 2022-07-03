"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const origamicore_1 = require("origamicore");
class Authorization {
    static checkAuthorization(domain, service, session) {
        var _a;
        if (session && session.superadmin)
            return true;
        var route = origamicore_1.Router.getRouteData(domain, service);
        if (route.isPublic)
            return true;
        if (!(session === null || session === void 0 ? void 0 : session.userid))
            return false;
        if (session.role && route.roles) {
            return ((_a = route.roles) === null || _a === void 0 ? void 0 : _a.indexOf(session.role)) > -1;
        }
        return true;
    }
}
exports.default = Authorization;
//# sourceMappingURL=authorization.js.map