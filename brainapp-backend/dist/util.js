"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashLink = void 0;
const hashLink = (len) => {
    const alplabet = "eoaweodfdvuamdfipwfmcoparei";
    let alpaLength = alplabet.length;
    let ans = "https:/";
    for (let i = 0; i < len; i++) {
        ans += alplabet[Math.floor((Math.random() * alpaLength))];
    }
    return ans + ".com";
};
exports.hashLink = hashLink;
