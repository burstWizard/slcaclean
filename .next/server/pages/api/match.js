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
exports.id = "pages/api/match";
exports.ids = ["pages/api/match"];
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

/***/ "(api)/./pages/api/match.js":
/*!****************************!*\
  !*** ./pages/api/match.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _auth_nextauth___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/[...nextauth] */ \"(api)/./pages/api/auth/[...nextauth].js\");\n\n\n\nasync function handler(req, res) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.unstable_getServerSession)(req, res, _auth_nextauth___WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session) {\n        res.status(401).json({\n            message: \"You must be logged in.\"\n        });\n        return;\n    }\n    const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.findUnique({\n        where: {\n            email: session.user.email\n        }\n    });\n    if (req.method == \"POST\") {\n        //Create default pairings with no data\n        //first, figure out how many people are here!\n        const players = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].player.findMany({\n            where: {\n                sectionId: req.body.section\n            }\n        });\n        const matchNum = Math.ceil(players.length / 2);\n        let temp = [];\n        for(let i = 0; i < matchNum; i++){\n            temp.push({\n                roundId: req.body.round,\n                board: i\n            });\n        }\n        console.log(temp);\n        const createMany = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].match.createMany({\n            data: temp\n        });\n        console.log(matchNum);\n        res.status(200).json({\n            message: createMany\n        });\n    } else {\n        const matches = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].match.findMany({\n            where: {\n                roundId: req.query.roundId\n            },\n            orderBy: {\n                board: \"asc\"\n            }\n        });\n        res.status(200).json({\n            matches: matches\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvbWF0Y2guanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBcUM7QUFDaUI7QUFDSjtBQUVuQyxlQUFlRyxPQUFPLENBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBRTVDLE1BQU1DLE9BQU8sR0FBRyxNQUFNTCxvRUFBeUIsQ0FBQ0csR0FBRyxFQUFFQyxHQUFHLEVBQUVILHdEQUFXLENBQUM7SUFFdEUsSUFBSSxDQUFDSSxPQUFPLEVBQUU7UUFDVkQsR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFQyxPQUFPLEVBQUUsd0JBQXdCO1NBQUUsQ0FBQyxDQUFDO1FBQzVELE9BQU87SUFDWCxDQUFDO0lBRUQsTUFBTUMsSUFBSSxHQUFHLE1BQU1WLG1FQUFzQixDQUFDO1FBQ3RDWSxLQUFLLEVBQUU7WUFDTEMsS0FBSyxFQUFFUCxPQUFPLENBQUNJLElBQUksQ0FBQ0csS0FBSztTQUMxQjtLQUNKLENBQUM7SUFDRixJQUFHVCxHQUFHLENBQUNVLE1BQU0sSUFBSSxNQUFNLEVBQUM7UUFFcEIsc0NBQXNDO1FBRXRDLDZDQUE2QztRQUU3QyxNQUFNQyxPQUFPLEdBQUcsTUFBTWYsbUVBQXNCLENBQUM7WUFDekNZLEtBQUssRUFBQztnQkFDRk0sU0FBUyxFQUFFZCxHQUFHLENBQUNlLElBQUksQ0FBQ0MsT0FBTzthQUNsQztTQUFDLENBQUM7UUFFSCxNQUFNQyxRQUFRLEdBQUdDLElBQUksQ0FBQ0MsSUFBSSxDQUFDUixPQUFPLENBQUNTLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFOUMsSUFBSUMsSUFBSSxHQUFHLEVBQUU7UUFFYixJQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0wsUUFBUSxFQUFFSyxDQUFDLEVBQUUsQ0FBRTtZQUMvQkQsSUFBSSxDQUFDRSxJQUFJLENBQUM7Z0JBQUNDLE9BQU8sRUFBRXhCLEdBQUcsQ0FBQ2UsSUFBSSxDQUFDVSxLQUFLO2dCQUFFQyxLQUFLLEVBQUVKLENBQUM7YUFBQyxDQUFDO1FBQ2xELENBQUM7UUFFREssT0FBTyxDQUFDQyxHQUFHLENBQUNQLElBQUksQ0FBQztRQUVqQixNQUFNUSxVQUFVLEdBQUcsTUFBTWpDLG9FQUF1QixDQUFDO1lBQzdDbUMsSUFBSSxFQUFFVixJQUFJO1NBQ2IsQ0FBQztRQUVGTSxPQUFPLENBQUNDLEdBQUcsQ0FBQ1gsUUFBUSxDQUFDO1FBRXJCaEIsR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFDQyxPQUFPLEVBQUV3QixVQUFVO1NBQUMsQ0FBQyxDQUFDO0lBQ2hELE9BQ0k7UUFDQSxNQUFNRyxPQUFPLEdBQUcsTUFBTXBDLGtFQUFxQixDQUFDO1lBQ3hDWSxLQUFLLEVBQUM7Z0JBQ0ZnQixPQUFPLEVBQUV4QixHQUFHLENBQUNpQyxLQUFLLENBQUNULE9BQU87YUFDN0I7WUFDRFUsT0FBTyxFQUFDO2dCQUNKUixLQUFLLEVBQUUsS0FBSzthQUNmO1NBQ0osQ0FBQztRQUVGekIsR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFNEIsT0FBTyxFQUFFQSxPQUFPO1NBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGFpcmluZy8uL3BhZ2VzL2FwaS9tYXRjaC5qcz9mZTc3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcmlzbWEgZnJvbSBcIi4uLy4uL2xpYi9wcmlzbWFcIlxuaW1wb3J0IHsgdW5zdGFibGVfZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIi4vYXV0aC9bLi4ubmV4dGF1dGhdXCJcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xuXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IHVuc3RhYmxlX2dldFNlcnZlclNlc3Npb24ocmVxLCByZXMsIGF1dGhPcHRpb25zKVxuXG4gICAgaWYgKCFzZXNzaW9uKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgbWVzc2FnZTogXCJZb3UgbXVzdCBiZSBsb2dnZWQgaW4uXCIgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgZW1haWw6IHNlc3Npb24udXNlci5lbWFpbCxcbiAgICAgICAgfSxcbiAgICB9KVxuICAgIGlmKHJlcS5tZXRob2QgPT0gXCJQT1NUXCIpe1xuXG4gICAgICAgIC8vQ3JlYXRlIGRlZmF1bHQgcGFpcmluZ3Mgd2l0aCBubyBkYXRhXG5cbiAgICAgICAgLy9maXJzdCwgZmlndXJlIG91dCBob3cgbWFueSBwZW9wbGUgYXJlIGhlcmUhXG5cbiAgICAgICAgY29uc3QgcGxheWVycyA9IGF3YWl0IHByaXNtYS5wbGF5ZXIuZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6e1xuICAgICAgICAgICAgICAgIHNlY3Rpb25JZDogcmVxLmJvZHkuc2VjdGlvblxuICAgICAgICB9fSlcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1hdGNoTnVtID0gTWF0aC5jZWlsKHBsYXllcnMubGVuZ3RoIC8gMilcblxuICAgICAgICBsZXQgdGVtcCA9IFtdXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaE51bTsgaSsrKSB7XG4gICAgICAgICAgICB0ZW1wLnB1c2goe3JvdW5kSWQ6IHJlcS5ib2R5LnJvdW5kLCBib2FyZDogaX0pXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyh0ZW1wKVxuXG4gICAgICAgIGNvbnN0IGNyZWF0ZU1hbnkgPSBhd2FpdCBwcmlzbWEubWF0Y2guY3JlYXRlTWFueSh7XG4gICAgICAgICAgICBkYXRhOiB0ZW1wIFxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnNvbGUubG9nKG1hdGNoTnVtKVxuICAgICAgICBcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe21lc3NhZ2U6IGNyZWF0ZU1hbnl9KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGF3YWl0IHByaXNtYS5tYXRjaC5maW5kTWFueSh7XG4gICAgICAgICAgICB3aGVyZTp7XG4gICAgICAgICAgICAgICAgcm91bmRJZDogcmVxLnF1ZXJ5LnJvdW5kSWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmRlckJ5OntcbiAgICAgICAgICAgICAgICBib2FyZDogXCJhc2NcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBtYXRjaGVzOiBtYXRjaGVzIH0pO1xuICAgIH1cbn0iXSwibmFtZXMiOlsicHJpc21hIiwidW5zdGFibGVfZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsInJlcSIsInJlcyIsInNlc3Npb24iLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJlbWFpbCIsIm1ldGhvZCIsInBsYXllcnMiLCJwbGF5ZXIiLCJmaW5kTWFueSIsInNlY3Rpb25JZCIsImJvZHkiLCJzZWN0aW9uIiwibWF0Y2hOdW0iLCJNYXRoIiwiY2VpbCIsImxlbmd0aCIsInRlbXAiLCJpIiwicHVzaCIsInJvdW5kSWQiLCJyb3VuZCIsImJvYXJkIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZU1hbnkiLCJtYXRjaCIsImRhdGEiLCJtYXRjaGVzIiwicXVlcnkiLCJvcmRlckJ5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/match.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/match.js"));
module.exports = __webpack_exports__;

})();