"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (error, defaultMessage) => {
    console.error('Error:', error);
    return { message: defaultMessage };
};
exports.handleError = handleError;
