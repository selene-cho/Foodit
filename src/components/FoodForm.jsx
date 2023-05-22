import React, { useState } from 'react';
import './FoodForm.css';
import FileInput from './FileInput';

export default function FoodForm() {
  const [values, setValues] = useState({
    title: '',
    calorie: 0,
    content: '',
    imgFile: null,
  });

  function sanitize(value, type) {
    switch (
      type // input이 숫자형일 때만 따로 처리
    ) {
      case 'number':
        return Number(value) || 0;

      default:
        return value;
    }
  }
  const handleChange = (name, value, type) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitize(value, type),
    }));
  };
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, value, type);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        type="file"
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={handleInputChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button>확 인</button>
    </form>
  );
}
