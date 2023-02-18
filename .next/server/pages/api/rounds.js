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
exports.id = "pages/api/rounds";
exports.ids = ["pages/api/rounds"];
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

/***/ "(api)/./pages/api/rounds.js":
/*!*****************************!*\
  !*** ./pages/api/rounds.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _auth_nextauth___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/[...nextauth] */ \"(api)/./pages/api/auth/[...nextauth].js\");\n\n\n\nasync function handler(req, res) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.unstable_getServerSession)(req, res, _auth_nextauth___WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session) {\n        res.status(401).json({\n            message: \"You must be logged in.\"\n        });\n        return;\n    }\n    const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.findUnique({\n        where: {\n            email: session.user.email\n        }\n    });\n    if (req.method == \"POST\") {\n        //Create a new round in this section\n        const rounds = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].round.findMany({\n            where: {\n                sectionId: req.body.sectionId\n            }\n        });\n        //First round creation\n        if (rounds.length == 0) {\n            console.log(\"Giiig\");\n            const round = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].round.create({\n                data: {\n                    sectionId: req.body.sectionId,\n                    locked: false,\n                    num: 1\n                }\n            });\n        } else {\n            const lastRound = rounds[rounds.length - 1];\n            if (!lastRound.locked) {\n                console.log(\"Last round has to be locked!\");\n            } else {\n                console.log(\"Hello!\");\n                const round1 = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].round.create({\n                    data: {\n                        sectionId: req.body.sectionId,\n                        locked: false,\n                        num: lastRound.num + 1\n                    }\n                });\n            }\n        }\n        res.status(200).json({\n            message: \"Hello\"\n        });\n    } else {\n        const rounds1 = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].round.findMany({\n            where: {\n                sectionId: req.query.sectionId\n            },\n            orderBy: {\n                num: \"asc\"\n            }\n        });\n        res.status(200).json({\n            rounds: rounds1\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcm91bmRzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXFDO0FBQ2lCO0FBQ0o7QUFFbkMsZUFBZUcsT0FBTyxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUU1QyxNQUFNQyxPQUFPLEdBQUcsTUFBTUwsb0VBQXlCLENBQUNHLEdBQUcsRUFBRUMsR0FBRyxFQUFFSCx3REFBVyxDQUFDO0lBRXRFLElBQUksQ0FBQ0ksT0FBTyxFQUFFO1FBQ1ZELEdBQUcsQ0FBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsT0FBTyxFQUFFLHdCQUF3QjtTQUFFLENBQUMsQ0FBQztRQUM1RCxPQUFPO0lBQ1gsQ0FBQztJQUVELE1BQU1DLElBQUksR0FBRyxNQUFNVixtRUFBc0IsQ0FBQztRQUN0Q1ksS0FBSyxFQUFFO1lBQ0xDLEtBQUssRUFBRVAsT0FBTyxDQUFDSSxJQUFJLENBQUNHLEtBQUs7U0FDMUI7S0FDSixDQUFDO0lBQ0YsSUFBR1QsR0FBRyxDQUFDVSxNQUFNLElBQUksTUFBTSxFQUFDO1FBQ3BCLG9DQUFvQztRQUNwQyxNQUFNQyxNQUFNLEdBQUcsTUFBTWYsa0VBQXFCLENBQUM7WUFDdkNZLEtBQUssRUFBQztnQkFDRk0sU0FBUyxFQUFFZCxHQUFHLENBQUNlLElBQUksQ0FBQ0QsU0FBUzthQUNoQztTQUNKLENBQUM7UUFFRixzQkFBc0I7UUFDdEIsSUFBR0gsTUFBTSxDQUFDSyxNQUFNLElBQUcsQ0FBQyxFQUFDO1lBQ2pCQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDcEIsTUFBTU4sS0FBSyxHQUFHLE1BQU1oQixnRUFBbUIsQ0FBQztnQkFDcEN3QixJQUFJLEVBQUM7b0JBQ0ROLFNBQVMsRUFBRWQsR0FBRyxDQUFDZSxJQUFJLENBQUNELFNBQVM7b0JBQzdCTyxNQUFNLEVBQUUsS0FBSztvQkFDYkMsR0FBRyxFQUFFLENBQUM7aUJBQ1Q7YUFDSixDQUFDO1FBQ04sT0FFSTtZQUVBLE1BQU1DLFNBQVMsR0FBR1osTUFBTSxDQUFDQSxNQUFNLENBQUNLLE1BQU0sR0FBQyxDQUFDLENBQUM7WUFDekMsSUFBRyxDQUFDTyxTQUFTLENBQUNGLE1BQU0sRUFBQztnQkFDakJKLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDhCQUE4QixDQUFDO1lBQy9DLE9BQ0k7Z0JBQ0FELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDckIsTUFBTU4sTUFBSyxHQUFHLE1BQU1oQixnRUFBbUIsQ0FBQztvQkFFcEN3QixJQUFJLEVBQUM7d0JBQ0ROLFNBQVMsRUFBRWQsR0FBRyxDQUFDZSxJQUFJLENBQUNELFNBQVM7d0JBQzdCTyxNQUFNLEVBQUUsS0FBSzt3QkFDYkMsR0FBRyxFQUFFQyxTQUFTLENBQUNELEdBQUcsR0FBQyxDQUFDO3FCQUN2QjtpQkFDSixDQUFDO1lBQ04sQ0FBQztRQUVMLENBQUM7UUFFRHJCLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBQ0MsT0FBTyxFQUFFLE9BQU87U0FBQyxDQUFDLENBQUM7SUFDN0MsT0FDSTtRQUNBLE1BQU1NLE9BQU0sR0FBRyxNQUFNZixrRUFBcUIsQ0FBQztZQUN2Q1ksS0FBSyxFQUFDO2dCQUNGTSxTQUFTLEVBQUVkLEdBQUcsQ0FBQ3dCLEtBQUssQ0FBQ1YsU0FBUzthQUNqQztZQUNEVyxPQUFPLEVBQUM7Z0JBQ0pILEdBQUcsRUFBRSxLQUFLO2FBQ2I7U0FDSixDQUFDO1FBRUZyQixHQUFHLENBQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVPLE1BQU0sRUFBRUEsT0FBTTtTQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BhaXJpbmcvLi9wYWdlcy9hcGkvcm91bmRzLmpzPzdjYjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vLi4vbGliL3ByaXNtYVwiXG5pbXBvcnQgeyB1bnN0YWJsZV9nZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiLi9hdXRoL1suLi5uZXh0YXV0aF1cIlxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XG5cbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgdW5zdGFibGVfZ2V0U2VydmVyU2Vzc2lvbihyZXEsIHJlcywgYXV0aE9wdGlvbnMpXG5cbiAgICBpZiAoIXNlc3Npb24pIHtcbiAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBtZXNzYWdlOiBcIllvdSBtdXN0IGJlIGxvZ2dlZCBpbi5cIiB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBlbWFpbDogc2Vzc2lvbi51c2VyLmVtYWlsLFxuICAgICAgICB9LFxuICAgIH0pXG4gICAgaWYocmVxLm1ldGhvZCA9PSBcIlBPU1RcIil7XG4gICAgICAgIC8vQ3JlYXRlIGEgbmV3IHJvdW5kIGluIHRoaXMgc2VjdGlvblxuICAgICAgICBjb25zdCByb3VuZHMgPSBhd2FpdCBwcmlzbWEucm91bmQuZmluZE1hbnkoe1xuICAgICAgICAgICAgd2hlcmU6e1xuICAgICAgICAgICAgICAgIHNlY3Rpb25JZDogcmVxLmJvZHkuc2VjdGlvbklkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy9GaXJzdCByb3VuZCBjcmVhdGlvblxuICAgICAgICBpZihyb3VuZHMubGVuZ3RoID09MCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdpaWlnXCIpXG4gICAgICAgICAgICBjb25zdCByb3VuZCA9IGF3YWl0IHByaXNtYS5yb3VuZC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uSWQ6IHJlcS5ib2R5LnNlY3Rpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbnVtOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICAvL1JvdW5kcyBleGlzdFxuICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICBjb25zdCBsYXN0Um91bmQgPSByb3VuZHNbcm91bmRzLmxlbmd0aC0xXVxuICAgICAgICAgICAgaWYoIWxhc3RSb3VuZC5sb2NrZWQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGFzdCByb3VuZCBoYXMgdG8gYmUgbG9ja2VkIVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvIVwiKVxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdW5kID0gYXdhaXQgcHJpc21hLnJvdW5kLmNyZWF0ZSh7XG5cbiAgICAgICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uSWQ6IHJlcS5ib2R5LnNlY3Rpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBudW06IGxhc3RSb3VuZC5udW0rMVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7bWVzc2FnZTogXCJIZWxsb1wifSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGNvbnN0IHJvdW5kcyA9IGF3YWl0IHByaXNtYS5yb3VuZC5maW5kTWFueSh7XG4gICAgICAgICAgICB3aGVyZTp7XG4gICAgICAgICAgICAgICAgc2VjdGlvbklkOiByZXEucXVlcnkuc2VjdGlvbklkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JkZXJCeTp7XG4gICAgICAgICAgICAgICAgbnVtOiAnYXNjJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyByb3VuZHM6IHJvdW5kcyB9KTtcbiAgICB9XG59Il0sIm5hbWVzIjpbInByaXNtYSIsInVuc3RhYmxlX2dldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJzZXNzaW9uIiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiZW1haWwiLCJtZXRob2QiLCJyb3VuZHMiLCJyb3VuZCIsImZpbmRNYW55Iiwic2VjdGlvbklkIiwiYm9keSIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGUiLCJkYXRhIiwibG9ja2VkIiwibnVtIiwibGFzdFJvdW5kIiwicXVlcnkiLCJvcmRlckJ5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/rounds.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/rounds.js"));
module.exports = __webpack_exports__;

})();