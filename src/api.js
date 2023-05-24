/**
 * request 함수(API 요청) 모아 놓은 파일
 */

const BASE_URL = 'https://learn.codeit.kr/0529';

// Foods GET 해오는 함수
export async function getFoods({
  order = '',
  cursor = '',
  limit = 10,
  search = '',
}) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`;
  const response = await fetch(`${BASE_URL}/foods?${query}`);
  if (!response.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}

// Food 데이터를 추가하는 함수
export async function createFood(formData) {
  const response = fetch(`${BASE_URL}/foods`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('데이터를 생성하는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}
