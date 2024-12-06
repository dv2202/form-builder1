import React, { useState } from 'react';

function FormPreview({ form }) {
  const [responses, setResponses] = useState({});

  const handleResponse = (questionId, response) => {
    setResponses({ ...responses, [questionId]: response });
  };

  const submitForm = async () => {
    try {
      const response = await fetch(`https://form-builder1.onrender.com/api/forms/${form._id}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responses),
      });
      const result = await response.json();
      console.log('Form submitted:', result);
      // Handle successful submission (e.g., show a success message)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case 'categorize':
        return (
          <div key={index} className="mb-4">
            <h3 className="font-bold mb-2">Categorize</h3>
            {question.data.items.map((item) => (
              <div key={item.id} className="mb-2">
                <span>{item.content}</span>
                <select
                  value={responses[question.id]?.[item.id] || ''}
                  onChange={(e) => handleResponse(question.id, { ...responses[question.id], [item.id]: e.target.value })}
                  className="ml-2 p-2 border rounded"
                >
                  <option value="">Select category</option>
                  {question.data.categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        );
      case 'cloze':
        return (
          <div key={index} className="mb-4">
            <h3 className="font-bold mb-2">Fill in the blanks</h3>
            {question.data.text.split('[blank]').map((part, i, array) => (
              <React.Fragment key={i}>
                {part}
                {i < array.length - 1 && (
                  <input
                    type="text"
                    value={responses[question.id]?.[i] || ''}
                    onChange={(e) => handleResponse(question.id, { ...responses[question.id], [i]: e.target.value })}
                    className="mx-1 p-1 border rounded"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        );
      case 'comprehension':
        return (
          <div key={index} className="mb-4">
            <h3 className="font-bold mb-2">Comprehension</h3>
            <p className="mb-2">{question.data.passage}</p>
            {question.data.questions.map((q) => (
              <div key={q.id} className="mb-2">
                <p>{q.text}</p>
                {q.options.map((option, i) => (
                  <div key={i}>
                    <input
                      type="radio"
                      id={`${q.id}-${i}`}
                      name={q.id}
                      value={option}
                      checked={responses[question.id]?.[q.id] === option}
                      onChange={(e) => handleResponse(question.id, { ...responses[question.id], [q.id]: e.target.value })}
                    />
                    <label htmlFor={`${q.id}-${i}`} className="ml-2">{option}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{form.title}</h2>
      {form.headerImage && <img src={form.headerImage} alt="Header" className="w-full h-auto mb-4" />}
      {form.questions.map((question, index) => renderQuestion(question, index))}
      <button
        onClick={submitForm}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit Form
      </button>
    </div>
  );
}

export default FormPreview;

