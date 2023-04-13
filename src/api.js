/**
 * request 함수(API 요청) 모아 놓은 파일
 */

// foods GET 해오는 함수
export async function getFoods({ order = '', cursor = '', limit = 10 }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/0529/foods?${query}`);
  if (!response.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}
