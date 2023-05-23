import { useEffect, useRef, useState } from 'react';

export default function FileInput({ name, onChange, type, value }) {
  const [preview, setPreview] = useState(); // 파일 미리보기 주소를 문자열로 저장
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    console.log(e.target.files[0]);
    onChange(name, nextValue, type);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return; // 파일 없을 때, useEffect 종료

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
  }, [value]); // 파일 선택할 때마다 미리보기 주소 변경

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input type={type} onChange={handleChange} ref={inputRef} />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}
