import React, { useState } from 'react';
import './FoodForm.css';

export default function FoodForm() {
  const [values, setValues] = useState({
    title: '',
    calorie: 0,
    content: '',
  });

  function sanitize(type, value) {
    switch (type) {
      case 'number':
        return Number(value) || 0;

      default:
        return value;
    }
  }
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitize(type, value),
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={handleChange}
      />
      <textarea name="content" value={values.content} onChange={handleChange} />
      <button>확 인</button>
    </form>
  );
}
