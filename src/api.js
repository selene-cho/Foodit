/**
 * request 함수(API 요청) 모아 놓은 파일
 */

// foods GET 해오는 함수
export async function getFoods({ order = '', cursor = '', limit = 10 }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/0529/foods?${query}`);
  const body = await response.json();
  return body;
}
