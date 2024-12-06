import React, { useState } from 'react';

function ClozeQuestion({ data, onChange }) {
  const [text, setText] = useState(data.text || '');
  const [blanks, setBlanks] = useState(data.blanks || []);

  const handleTextChange = (e) => {
    setText(e.target.value);
    updateData();
  };

  const addBlank = () => {
    setBlanks([...blanks, '']);
    updateData();
  };

  const updateBlank = (index, value) => {
    const updatedBlanks = blanks.map((b, i) => i === index ? value : b);
    setBlanks(updatedBlanks);
    updateData();
  };

  const updateData = () => {
    onChange({ text, blanks });
  };

  return (
    <div className="border p-4 rounded">
      <h3 className="text-lg font-bold mb-2">Cloze Question</h3>
      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter text with [blank] placeholders"
        rows={4}
      />
      <div className="mb-2">
        <h4 className="font-bold">Blanks</h4>
        {blanks.map((blank, index) => (
          <input
            key={index}
            type="text"
            value={blank}
            onChange={(e) => updateBlank(index, e.target.value)}
            className="block w-full p-2 border rounded mb-2"
            placeholder={`Blank ${index + 1}`}
          />
        ))}
      </div>
      <button
        onClick={addBlank}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Blank
      </button>
    </div>
  );
}

export default ClozeQuestion;

