import FoodList from './FoodList';
import { useEffect, useState } from 'react';
import { getFoods } from '../api';

export default function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('createdAt');
  const [cursor, setCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState('');

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder('createdAt');
  const handleCalorieClick = () => setOrder('calorie');
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getFoods(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const {
      foods,
      paging: { nextCursor },
    } = result;
    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setCursor(nextCursor);
  };
  const handleLoadMore = () => {
    handleLoad({ order, cursor, search }); // '더보기' 버튼 눌렀을 때, 검색어 함께 요청되도록 search 추가
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target['search'].value);
  };

  useEffect(() => {
    handleLoad({ order, search }); // handleLoad에 전달할 옵션 값으로 order, search
  }, [order, search]);

  return (
    <div className="">
      <form onSubmit={handleSearchSubmit}>
        <input name="search" />
        <button type="submit">검색</button>
      </form>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
      {cursor && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}
