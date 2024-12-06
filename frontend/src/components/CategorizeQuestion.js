import React, { useState } from 'react';

function CategorizeQuestion({ data, onChange }) {
  const [categories, setCategories] = useState(data.categories || []);
  const [items, setItems] = useState(data.items || []);

  const addCategory = () => {
    const newCategory = { id: Date.now(), name: '' };
    setCategories([...categories, newCategory]);
    updateData();
  };

  const addItem = () => {
    const newItem = { id: Date.now(), content: '', category: '' };
    setItems([...items, newItem]);
    updateData();
  };

  const updateCategory = (id, name) => {
    const updatedCategories = categories.map(c => c.id === id ? { ...c, name } : c);
    setCategories(updatedCategories);
    updateData();
  };

  const updateItem = (id, content, category) => {
    const updatedItems = items.map(i => i.id === id ? { ...i, content, category } : i);
    setItems(updatedItems);
    updateData();
  };

  const updateData = () => {
    onChange({ categories, items });
  };

  return (
    <div className="border p-4 rounded">
      <h3 className="text-lg font-bold mb-2">Categorize Question</h3>
      <div className="mb-4">
        <h4 className="font-bold">Categories</h4>
        {categories.map(category => (
          <input
            key={category.id}
            type="text"
            value={category.name}
            onChange={(e) => updateCategory(category.id, e.target.value)}
            className="block w-full p-2 border rounded mb-2"
            placeholder="Category name"
          />
        ))}
        <button
          onClick={addCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>
      <div>
        <h4 className="font-bold">Items</h4>
        {items.map(item => (
          <div key={item.id} className="flex mb-2">
            <input
              type="text"
              value={item.content}
              onChange={(e) => updateItem(item.id, e.target.value, item.category)}
              className="flex-grow p-2 border rounded mr-2"
              placeholder="Item content"
            />
            <select
              value={item.category}
              onChange={(e) => updateItem(item.id, item.content, e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        ))}
        <button
          onClick={addItem}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>
    </div>
  );
}

export default CategorizeQuestion;

