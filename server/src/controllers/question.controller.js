import Question from "../models/Question.js";

export async function createQuestion(req, res) {
  try {
    const { title, description, tags } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const question = await Question.create({
      title,
      description,
      tags: Array.isArray(tags) ? tags : [],
      creator: req.user._id,
    });

    await question.populate("creator", "name email role");
    
    return res.status(201).json(question);
  } catch (err) {
    console.error("Create question error:", err);
    
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    
    return res.status(500).json({ message: "Failed to create question" });
  }
}

export async function listQuestions(req, res) {
  try {
    const { q, tags } = req.query;
    let filter = {};
    
    if (q) {
    
      filter.$text = { $search: q };
    }
    
    if (tags) {
      const tagArray = Array.isArray(tags)
        ? tags
        : String(tags).split(",").map((t) => t.trim()).filter(Boolean);
      if (tagArray.length) {
        filter.tags = { $in: tagArray };
      }
    }

    let query = Question.find(filter);

  
    if (q) {
      query = query.select({ score: { $meta: "textScore" } })
                   .sort({ score: { $meta: "textScore" } });
    } else {
      
      query = query.sort({ createdAt: -1 });
    }

    const questions = await query.populate("creator", "name email role");
      
    return res.json(questions);
  } catch (err) {
    console.error("List questions error:", err);
    return res.status(500).json({ message: "Failed to fetch questions" });
  }
}

export async function getQuestionById(req, res) {
  try {
    const question = await Question.findById(req.params.id)
      .populate("creator", "name email role");
      
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    
    return res.json(question);
  } catch (err) {
    console.error("Get question error:", err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ message: "Invalid question ID format" });
    }
    
    return res.status(500).json({ message: "Failed to fetch question" });
  }
}