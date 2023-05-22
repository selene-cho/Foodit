export default function FileInput({ name, onChange, type }) {
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    console.log(e.target.files[0]);
    onChange(name, nextValue, type);
  };
  return <input type={type} onChange={handleChange} />;
}
