import { useEffect, useRef } from 'react';

export default function FileInput({ name, onChange, type }) {
  const inputRef = useRef();
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    console.log(e.target.files[0]);
    onChange(name, nextValue, type);
  };
  useEffect(() => {
    if (inputRef.current) {
      console.log(inputRef.current);
    }
  }, []);
  return <input type={type} onChange={handleChange} />;
}
