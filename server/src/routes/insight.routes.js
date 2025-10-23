import { Router } from 'express';
import { requireAuth, requireManager } from '../middleware/auth.js';
import { createInsight, listInsightsByQuestion } from '../controllers/insight.controller.js';

const router = Router();


router.get('/:questionId', requireAuth, listInsightsByQuestion);

router.post('/', requireAuth, requireManager, createInsight);

export default router;
