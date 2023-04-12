import './FoodListItem.css';

export default function FoodListItem({ item, onDelete }) {
  const { id, imgUrl, title, calorie, content } = item;
  const handleDeleteClick = () => onDelete(id);
  return (
    <div className="FoodListItem">
      <img className="FoodListItemImg" src={imgUrl} alt={title} />
      <p>{title}</p>
      <p>{calorie}</p>
      <p>{content}</p>
      <button onClick={handleDeleteClick}>삭제</button>
    </div>
  );
}
