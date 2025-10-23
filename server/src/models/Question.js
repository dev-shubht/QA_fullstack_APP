import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    tags: {
      type: [String],
      default: []
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { 
    timestamps: true
  }
);


questionSchema.index({ 
  title: 'text', 
  description: 'text' 
}, {
  name: 'question_text_search'  
});


questionSchema.index({ tags: 1 });

export default mongoose.model('Question', questionSchema);