import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createQuestion, listQuestions, getQuestionById } from '../controllers/question.controller.js';

const router = Router();

router.get('/', listQuestions);
router.get('/:id', getQuestionById);
router.post('/', requireAuth, createQuestion);

export default router;


