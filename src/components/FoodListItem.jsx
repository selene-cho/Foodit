import './FoodListItem.css';

export default function FoodListItem({ item }) {
  const { imgUrl, title, calorie, content } = item;
  return (
    <div className="FoodListItem">
      <img className="FoodListItemImg" src={imgUrl} alt={title} />
      <p>{title}</p>
      <p>{calorie}</p>
      <p>{content}</p>
    </div>
  );
}
