import React, { useState } from 'react';
import CategorizeQuestion from './CategorizeQuestion';
import ClozeQuestion from './ClozeQuestion';
import ComprehensionQuestion from './ComprehensionQuestion';

function FormEditor({ onSave }) {
  const [title, setTitle] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [questions, setQuestions] = useState([]);

  const addQuestion = (type) => {
    setQuestions([...questions, { type, data: {} }]);
  };

  const updateQuestion = (index, data) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].data = data;
    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    const form = {
      title,
      headerImage,
      questions,
    };
    onSave(form);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Form Title"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        value={headerImage}
        onChange={(e) => setHeaderImage(e.target.value)}
        placeholder="Header Image URL"
        className="w-full p-2 border rounded"
      />
      {questions.map((question, index) => {
        switch (question.type) {
          case 'categorize':
            return (
              <CategorizeQuestion
                key={index}
                data={question.data}
                onChange={(data) => updateQuestion(index, data)}
              />
            );
          case 'cloze':
            return (
              <ClozeQuestion
                key={index}
                data={question.data}
                onChange={(data) => updateQuestion(index, data)}
              />
            );
          case 'comprehension':
            return (
              <ComprehensionQuestion
                key={index}
                data={question.data}
                onChange={(data) => updateQuestion(index, data)}
              />
            );
          default:
            return null;
        }
      })}
      <div className="space-x-2">
        <button
          onClick={() => addQuestion('categorize')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Categorize Question
        </button>
        <button
          onClick={() => addQuestion('cloze')}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Add Cloze Question
        </button>
        <button
          onClick={() => addQuestion('comprehension')}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Add Comprehension Question
        </button>
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Form
      </button>
    </div>
  );
}

export default FormEditor;

