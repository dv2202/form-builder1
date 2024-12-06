import React, { useState } from 'react';

function ComprehensionQuestion({ data, onChange }) {
  const [passage, setPassage] = useState(data.passage || '');
  const [questions, setQuestions] = useState(data.questions || []);

  const handlePassageChange = (e) => {
    setPassage(e.target.value);
    updateData();
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    };
    setQuestions([...questions, newQuestion]);
    updateData();
  };

  const updateQuestion = (id, field, value) => {
    const updatedQuestions = questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
    updateData();
  };

  const updateOption = (questionId, optionIndex, value) => {
    const updatedQuestions = questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, i) => i === optionIndex ? value : opt) } 
        : q
    );
    setQuestions(updatedQuestions);
    updateData();
  };

  const updateData = () => {
    onChange({ passage, questions });
  };

  return (
    <div className="border p-4 rounded">
      <h3 className="text-lg font-bold mb-2">Comprehension Question</h3>
      <textarea
        value={passage}
        onChange={handlePassageChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter passage"
        rows={6}
      />
      <div className="mb-2">
        <h4 className="font-bold">Questions</h4>
        {questions.map(question => (
          <div key={question.id} className="mb-4">
            <input
              type="text"
              value={question.text}
              onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Question text"
            />
            {question.options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => updateOption(question.id, index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder={`Option ${index + 1}`}
              />
            ))}
            <select
              value={question.correctAnswer}
              onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select correct answer</option>
              {question.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button
        onClick={addQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Question
      </button>
    </div>
  );
}

export default ComprehensionQuestion;

