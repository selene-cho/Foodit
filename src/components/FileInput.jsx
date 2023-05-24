import { useEffect, useRef, useState } from 'react';

export default function FileInput({ name, onChange, value }) {
  const [preview, setPreview] = useState(); // 파일 미리보기 주소를 문자열로 저장
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    console.log(e.target.files[0]);
    onChange(name, nextValue);
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

    // 리턴값 기억해뒀다가 다음 value state 변경될 때 실행, ObjectURL 더이상 사용하지 않으니까 정리
    return () => {
      setPreview(); // preview state를 빈 값으로 만듦
      URL.revokeObjectURL(nextPreview); // 사이드 이펙트 정리
    };
  }, [value]); // 파일 선택할 때마다 미리보기 주소 변경

  return (
    <div>
      <img src={preview} accept="image/png, image/jpeg" alt="이미지 미리보기" />{' '}
      {/* image 파일만 받도록 accept 추가 */}
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}
