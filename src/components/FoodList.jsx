import FoodListItem from './FoodListItem';

export default function FoodList({ items, onDelete }) {
  return (
    <ul className="FoodList">
      {items.map((item) => (
        <li key={item.id}>
          <FoodListItem item={item} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
