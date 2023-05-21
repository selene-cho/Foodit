import React, { useState } from 'react';
import './FoodForm.css';

export default function FoodForm() {
  const [title, setTitle] = useState('');
  const [calorie, setCalorie] = useState(0);
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleCalorieChange = (e) => {
    const nextCalorie = Number(e.target.value) || 0;
    setCalorie(nextCalorie);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form className="FoodForm">
      <input name="title" value={title} onChange={handleTitleChange} />
      <input
        type="number"
        name="calorie"
        value={calorie}
        onChange={handleCalorieChange}
      />
      <textarea name="content" value={content} onChange={handleContentChange} />
    </form>
  );
}
