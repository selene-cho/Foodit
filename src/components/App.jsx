import FoodList from './FoodList';
import { useEffect, useState } from 'react';
import { getFoods } from '../api';

const LIMIT = 6;

export default function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('createdAt');
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder('createdAt');
  const handleCalorieClick = () => setOrder('calorie');
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  const handleLoad = async (options) => {
    const { foods, paging } = await getFoods(options);
    if (options.offset === 0) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setOffset(options.offset + foods.length);
    setHasNext(paging.hasNext);
  };
  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad(order);
  }, [order]);

  return (
    <div className="">
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
      {hasNext && <button onClick={handleLoadMore}>더보기</button>}
    </div>
  );
}
