import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectToDatabase } from './utils/db.js';
import authRoutes from './routes/auth.routes.js';
import questionRoutes from './routes/question.routes.js';
import answerRoutes from './routes/answer.routes.js';
import insightRoutes from './routes/insight.routes.js';

dotenv.config();

const app = express();

// FIXED CORS CONFIGURATION
app.use(cors({
  origin: [
    'https://qa-fullstack-app.onrender.com',
    'http://localhost:3000' // Add localhost for development
  ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ADD OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // ADD Headers
  credentials: true
}));

// Alternative: SIMPLE CORS (temporary fix)
// app.use(cors());

app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/auth', authRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);
app.use('/insights', insightRoutes);

const PORT = process.env.PORT || 5000;

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log(`Using ${global.useFileDb ? 'file' : 'MongoDB'} database`);
      console.log('CORS configured for:', [
        'https://qa-fullstack-app.onrender.com',
        'http://localhost:3000'
      ]);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database', err);
    process.exit(1);
  });
