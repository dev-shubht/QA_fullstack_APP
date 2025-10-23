import Answer from "../models/Answer.js";
import Question from "../models/Question.js";

export async function createAnswer(req, res) {
  try {
    const { questionId, content } = req.body;
    
    if (!questionId || !content) {
      return res.status(400).json({ message: "questionId and content are required" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Authentication required" });
    }

    
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const answer = await Answer.create({
      question: questionId,
      content,
      creator: req.user._id,
    });

    
    const populatedAnswer = await Answer.findById(answer._id)
      .populate("creator", "name email role");
      
    return res.status(201).json(populatedAnswer);
  } catch (err) {
    console.error("Create answer error:", err);
    
    // it Handles MongoDB validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    
    if (err.name === 'CastError') {
      return res.status(400).json({ message: "Invalid question ID format" });
    }
    
    return res.status(500).json({ message: "Failed to create answer" });
  }
}

export async function listAnswersByQuestion(req, res) {
  try {
    const { questionId } = req.params;

    const answers = await Answer.find({ question: questionId })
      .populate("creator", "name email role")
      .sort({ createdAt: -1 });
      
    return res.json(answers);
  } catch (err) {
    console.error("List answers error:", err);
    
    // it Handles invalid ObjectId
    if (err.name === 'CastError') {
      return res.status(400).json({ message: "Invalid question ID format" });
    }
    
    return res.status(500).json({ message: "Failed to fetch answers" });
  }
}