"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/roster";
exports.ids = ["pages/api/roster"];
exports.modules = {

/***/ "@next-auth/prisma-adapter":
/*!********************************************!*\
  !*** external "@next-auth/prisma-adapter" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@next-auth/prisma-adapter");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/google":
/*!*********************************************!*\
  !*** external "next-auth/providers/google" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/google");

/***/ }),

/***/ "(api)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// lib/prisma.ts\n\nlet prisma;\nif (false) {} else {\n    if (!global.prisma) {\n        global.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n    }\n    prisma = global.prisma;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvcHJpc21hLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdCQUFnQjtBQUM2QjtBQUU3QyxJQUFJQyxNQUFNO0FBRVYsSUFBSUMsS0FBcUMsRUFBRSxFQUUxQyxNQUFNO0lBQ0wsSUFBSSxDQUFDQyxNQUFNLENBQUNGLE1BQU0sRUFBRTtRQUNsQkUsTUFBTSxDQUFDRixNQUFNLEdBQUcsSUFBSUQsd0RBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFDREMsTUFBTSxHQUFHRSxNQUFNLENBQUNGLE1BQU0sQ0FBQztBQUN6QixDQUFDO0FBRUQsaUVBQWVBLE1BQU0sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BhaXJpbmcvLi9saWIvcHJpc21hLnRzPzk4MjIiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3ByaXNtYS50c1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmxldCBwcmlzbWE6IFByaXNtYUNsaWVudDtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xufSBlbHNlIHtcbiAgaWYgKCFnbG9iYWwucHJpc21hKSB7XG4gICAgZ2xvYmFsLnByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcbiAgfVxuICBwcmlzbWEgPSBnbG9iYWwucHJpc21hO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwcmlzbWE7Il0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInByaXNtYSIsInByb2Nlc3MiLCJnbG9iYWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./lib/prisma.ts\n");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].js":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authOptions\": () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"next-auth/providers/google\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"@next-auth/prisma-adapter\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst authOptions = {\n    // Configure one or more authentication providers\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_3__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n    providers: [\n        next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default()({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET,\n            authorization: {\n                params: {\n                    prompt: \"consent\",\n                    access_type: \"offline\",\n                    response_type: \"code\"\n                }\n            }\n        })\n    ]\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFnQztBQUN3QjtBQUNoQjtBQUNpQjtBQUNsRCxNQUFNSSxXQUFXLEdBQUc7SUFDekIsaURBQWlEO0lBQ2pEQyxPQUFPLEVBQUVGLHdFQUFhLENBQUNELG1EQUFNLENBQUM7SUFDOUJJLFNBQVMsRUFBRTtRQUNUTCxpRUFBYyxDQUFDO1lBQ2JNLFFBQVEsRUFBRUMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLGdCQUFnQjtZQUN0Q0MsWUFBWSxFQUFFSCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0csb0JBQW9CO1lBQzlDQyxhQUFhLEVBQUU7Z0JBQ2JDLE1BQU0sRUFBRTtvQkFDTkMsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCQyxXQUFXLEVBQUUsU0FBUztvQkFDdEJDLGFBQWEsRUFBRSxNQUFNO2lCQUN0QjthQUNGO1NBQ0YsQ0FBQztLQUNIO0NBQ0Y7QUFDRCxpRUFBZWpCLGdEQUFRLENBQUNJLFdBQVcsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BhaXJpbmcvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzPzUyN2YiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIlxuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZVwiO1xuaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vLi4vLi4vbGliL3ByaXNtYVwiXG5pbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSBcIkBuZXh0LWF1dGgvcHJpc21hLWFkYXB0ZXJcIlxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zID0ge1xuICAvLyBDb25maWd1cmUgb25lIG9yIG1vcmUgYXV0aGVudGljYXRpb24gcHJvdmlkZXJzXG4gIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQsXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVULFxuICAgICAgYXV0aG9yaXphdGlvbjoge1xuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBwcm9tcHQ6IFwiY29uc2VudFwiLFxuICAgICAgICAgIGFjY2Vzc190eXBlOiBcIm9mZmxpbmVcIixcbiAgICAgICAgICByZXNwb25zZV90eXBlOiBcImNvZGVcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgXSxcbn1cbmV4cG9ydCBkZWZhdWx0IE5leHRBdXRoKGF1dGhPcHRpb25zKSJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIkdvb2dsZVByb3ZpZGVyIiwicHJpc21hIiwiUHJpc21hQWRhcHRlciIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInByb3ZpZGVycyIsImNsaWVudElkIiwicHJvY2VzcyIsImVudiIsIkdPT0dMRV9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsImF1dGhvcml6YXRpb24iLCJwYXJhbXMiLCJwcm9tcHQiLCJhY2Nlc3NfdHlwZSIsInJlc3BvbnNlX3R5cGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].js\n");

/***/ }),

/***/ "(api)/./pages/api/roster.js":
/*!*****************************!*\
  !*** ./pages/api/roster.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _auth_nextauth___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/[...nextauth] */ \"(api)/./pages/api/auth/[...nextauth].js\");\n\n\n\nasync function handler(req, res) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.unstable_getServerSession)(req, res, _auth_nextauth___WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session) {\n        res.status(401).json({\n            message: \"You must be logged in.\"\n        });\n        return;\n    }\n    const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.findUnique({\n        where: {\n            email: session.user.email\n        }\n    });\n    if (req.method == \"POST\") {\n        //Handle both adding students and adding schools\n        console.log(req.body.setting);\n        if (req.body.setting == \"student\") {\n            console.log(\"Trello\");\n            //handle student addition\n            const player = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].player.create({\n                data: {\n                    name: req.body.student,\n                    schoolId: req.body.schoolId,\n                    sectionId: req.body.sectionId\n                }\n            });\n        } else {\n            console.log(\"shit man\");\n            //handle school addition\n            const school = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].school.create({\n                data: {\n                    name: req.body.school,\n                    sectionId: req.body.sectionId\n                }\n            });\n        }\n        res.status(200).json({\n            message: \"Hello\"\n        });\n    } else {\n        //Build the list of schools and players by first getting all schools involved with section then getting each student involved with school\n        const schools = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].school.findMany({\n            where: {\n                sectionId: req.query.sectionId\n            }\n        });\n        const temp = [];\n        for (const element of schools){\n            const players = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].player.findMany({\n                where: {\n                    schoolId: element.id\n                }\n            });\n            await temp.push([\n                element,\n                players\n            ]);\n        }\n        res.status(200).json({\n            roster: temp\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJpc21hIGZyb20gXCIuLi8uLi9saWIvcHJpc21hXCJcbmltcG9ydCB7IHVuc3RhYmxlX2dldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCIuL2F1dGgvWy4uLm5leHRhdXRoXVwiXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCB1bnN0YWJsZV9nZXRTZXJ2ZXJTZXNzaW9uKHJlcSwgcmVzLCBhdXRoT3B0aW9ucylcblxuICAgIGlmICghc2Vzc2lvbikge1xuICAgICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6IFwiWW91IG11c3QgYmUgbG9nZ2VkIGluLlwiIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGVtYWlsOiBzZXNzaW9uLnVzZXIuZW1haWwsXG4gICAgICAgIH0sXG4gICAgfSlcbiAgICBpZihyZXEubWV0aG9kID09IFwiUE9TVFwiKXtcbiAgICAgICAgLy9IYW5kbGUgYm90aCBhZGRpbmcgc3R1ZGVudHMgYW5kIGFkZGluZyBzY2hvb2xzXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcS5ib2R5LnNldHRpbmcpXG4gICAgICAgIGlmKHJlcS5ib2R5LnNldHRpbmcgPT0gXCJzdHVkZW50XCIpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUcmVsbG9cIilcbiAgICAgICAgICAgIC8vaGFuZGxlIHN0dWRlbnQgYWRkaXRpb25cbiAgICAgICAgICAgIGNvbnN0IHBsYXllciA9IGF3YWl0IHByaXNtYS5wbGF5ZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVxLmJvZHkuc3R1ZGVudCxcbiAgICAgICAgICAgICAgICAgICAgc2Nob29sSWQ6IHJlcS5ib2R5LnNjaG9vbElkLFxuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uSWQ6IHJlcS5ib2R5LnNlY3Rpb25JZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2hpdCBtYW5cIilcbiAgICAgICAgICAgIC8vaGFuZGxlIHNjaG9vbCBhZGRpdGlvblxuICAgICAgICAgICAgY29uc3Qgc2Nob29sID0gYXdhaXQgcHJpc21hLnNjaG9vbC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiByZXEuYm9keS5zY2hvb2wsXG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb25JZDogcmVxLmJvZHkuc2VjdGlvbklkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7bWVzc2FnZTogXCJIZWxsb1wifSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIFxuICAgICAgICAvL0J1aWxkIHRoZSBsaXN0IG9mIHNjaG9vbHMgYW5kIHBsYXllcnMgYnkgZmlyc3QgZ2V0dGluZyBhbGwgc2Nob29scyBpbnZvbHZlZCB3aXRoIHNlY3Rpb24gdGhlbiBnZXR0aW5nIGVhY2ggc3R1ZGVudCBpbnZvbHZlZCB3aXRoIHNjaG9vbFxuICAgICAgICBjb25zdCBzY2hvb2xzID0gYXdhaXQgcHJpc21hLnNjaG9vbC5maW5kTWFueSh7XG4gICAgICAgICAgICB3aGVyZTp7XG4gICAgICAgICAgICAgICAgc2VjdGlvbklkOiByZXEucXVlcnkuc2VjdGlvbklkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgdGVtcCA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBzY2hvb2xzKSB7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJzID0gYXdhaXQgcHJpc21hLnBsYXllci5maW5kTWFueSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBzY2hvb2xJZDogZWxlbWVudC5pZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCB0ZW1wLnB1c2goW2VsZW1lbnQsIHBsYXllcnNdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgcm9zdGVyOiB0ZW1wIH0pO1xuICAgIH1cbn0iXSwibmFtZXMiOlsicHJpc21hIiwidW5zdGFibGVfZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsInJlcSIsInJlcyIsInNlc3Npb24iLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJlbWFpbCIsIm1ldGhvZCIsImNvbnNvbGUiLCJsb2ciLCJib2R5Iiwic2V0dGluZyIsInBsYXllciIsImNyZWF0ZSIsImRhdGEiLCJuYW1lIiwic3R1ZGVudCIsInNjaG9vbElkIiwic2VjdGlvbklkIiwic2Nob29sIiwic2Nob29scyIsImZpbmRNYW55IiwicXVlcnkiLCJ0ZW1wIiwiZWxlbWVudCIsInBsYXllcnMiLCJpZCIsInB1c2giLCJyb3N0ZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/roster.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/roster.js"));
module.exports = __webpack_exports__;

})();