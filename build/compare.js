"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = void 0;
const hash_1 = require("./hash");
function compare(password, storedHash) {
    const hashedPassword = (0, hash_1.hash)(password);
    return hashedPassword === storedHash;
}
exports.compare = compare;
