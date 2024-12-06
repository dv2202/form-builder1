const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['categorize', 'cloze', 'comprehension'],
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  headerImage: {
    type: String,
  },
  questions: [QuestionSchema],
});

module.exports = mongoose.model('Form', FormSchema);

