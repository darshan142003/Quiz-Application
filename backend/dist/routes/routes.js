"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quizController_1 = require("../controller/quizController");
const router = (0, express_1.Router)();
router.get("/:id/questions", quizController_1.getQuiz);
router.post("/:id/submit", quizController_1.submitQuiz);
exports.default = router;
