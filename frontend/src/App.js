import React, { useState, useEffect } from "react";
import FormEditor from "./components/FormEditor";
import FormPreview from "./components/FormPreview";

function App() {
  const [forms, setForms] = useState([]);
  const [currentForm, setCurrentForm] = useState(null); 
  const [isPreview, setIsPreview] = useState(false); 


  useEffect(() => {
    fetchForms();
  }, []);


  const fetchForms = async () => {
    try {
      const response = await fetch(`https://form-builder1.onrender.com/api/forms`);
      const data = await response.json();
      setForms(data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const handleFormSave = async (form) => {
    try {
      const response = await fetch(`https://form-builder1.onrender.com/api/forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const savedForm = await response.json();

      if (currentForm) {
        setForms(forms.map((f) => (f._id === savedForm._id ? savedForm : f)));
      } else {
        setForms([...forms, savedForm]);
      }
      setCurrentForm(savedForm);
      setIsPreview(false); 
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };


  const togglePreview = () => {
    if (!currentForm) {
      alert("Please select a form to preview.");
      return;
    }
    setIsPreview(!isPreview);
  };


  const handleAddNewForm = () => {
    setCurrentForm(null); 
    setIsPreview(false); 
  };


  const handleFormSelect = (form) => {
    setCurrentForm(form); 
    setIsPreview(true); 
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Form Builder</h1>

      {/* Form List */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Available Forms:</h2>
        <ul className="list-disc pl-6">
          {forms.length > 0 ? (
            forms.map((form) => (
              <li key={form._id} className="mb-2">
                <button
                  className="text-blue-500 underline"
                  onClick={() => handleFormSelect(form)}
                >
                  {form.title || "Untitled Form"}
                </button>
              </li>
            ))
          ) : (
            <p>No forms available. Create one to get started!</p>
          )}
        </ul>
      </div>

      {/* Buttons */}
      <div className="mb-4">
        <button
          onClick={togglePreview}
          className={`bg-blue-500 text-white px-4 py-2 rounded mr-2 ${
            !currentForm && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!currentForm}
        >
          {isPreview ? "Edit Form" : "Preview Form"}
        </button>
        <button
          onClick={handleAddNewForm}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New Form
        </button>
      </div>

      <div className="mt-6">
        {isPreview ? (
          currentForm ? (
            <FormPreview form={currentForm} />
          ) : (
            <p>No form selected for preview.</p>
          )
        ) : (
          <FormEditor form={currentForm} onSave={handleFormSave} />
        )}
      </div>
    </div>
  );
}

export default App;
