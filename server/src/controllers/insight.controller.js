import Insight from "../models/Insight.js";
import Question from "../models/Question.js";

export async function createInsight(req, res) {
  try {
    const { questionId, summary } = req.body;
    
    if (!questionId || !summary) {
      return res.status(400).json({ 
        message: "questionId and summary are required" 
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ 
        message: "Authentication required" 
      });
    }

    
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ 
        message: "Question not found" 
      });
    }

    const insight = await Insight.create({
      question: questionId,
      summary,
      creator: req.user._id,
      createdBy: req.user._id,
    });

    const populatedInsight = await Insight.findById(insight._id)
      .populate("creator", "name email role");

    return res.status(201).json(populatedInsight);
  } catch (err) {
    console.error("Create insight error:", err);
    
  
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors 
      });
    }
    
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        message: "Invalid question ID format" 
      });
    }
    
    return res.status(500).json({ 
      message: "Failed to create insight" 
    });
  }
}

export async function listInsightsByQuestion(req, res) {
  try {
    const { questionId } = req.params;

    const insights = await Insight.find({ question: questionId })
      .populate("creator", "name email role")
      .sort({ createdAt: -1 });
      
    return res.json(insights);
  } catch (err) {
    console.error("List insights error:", err);
    
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        message: "Invalid question ID format" 
      });
    }
    
    return res.status(500).json({ 
      message: "Failed to fetch insights" 
    });
  }
}