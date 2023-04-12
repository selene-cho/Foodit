import FoodList from './FoodList';
import items from '../mock.json';

export default function App() {
  return (
    <div>
      <FoodList items={items} />
    </div>
  );
}
