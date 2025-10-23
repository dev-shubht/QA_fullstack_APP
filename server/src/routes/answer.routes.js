import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createAnswer, listAnswersByQuestion } from '../controllers/answer.controller.js';

const router = Router();

router.get('/:questionId', listAnswersByQuestion);
router.post('/', requireAuth, createAnswer);

export default router;


