import FoodListItem from './FoodListItem';

export default function FoodList({ items }) {
  return (
    <ul className="FoodList">
      {items.map((item) => (
        <li>
          <FoodListItem item={item} />
        </li>
      ))}
    </ul>
  );
}
