import React, { useState } from 'react';
import './FoodForm.css';
import FileInput from './FileInput';
import { createFood } from '../api';

const INITIAL_VALUES = {
  title: '',
  calorie: 0,
  content: '',
  imgFile: null,
};

export default function FoodForm({ onSubmitSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [values, setValues] = useState(INITIAL_VALUES);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imgFile', values.imgFile);
    formData.append('title', values.title);
    formData.append('calorie', values.calorie);
    formData.append('content', values.content);

    let result;
    try {
      setSubmittingError(null); // error 없음
      setIsSubmitting(true); // 제출 중 - 버튼 비활성화
      result = await createFood(formData); // food 데이터 생성하는 api request 보냄
    } catch (error) {
      setSubmittingError(error); // 에러 메시지 출력
      return;
    } finally {
      setIsSubmitting(false); // 제출 완료 - 버튼 활성화
    }
    const { food } = result;
    onSubmitSuccess(food); // requset 성공하면 response 데이터(food)를 가지고 onSubmitSuccess 함수 실행
    setValues(INITIAL_VALUES);
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
      <button type="submit" disabled={isSubmitting}>
        확 인
      </button>
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}
