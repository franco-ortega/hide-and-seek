import { generateNumber } from '../utils/utils';

it('generate number between 1 and 3', () => {
  const range = [1, 2, 3];
  const result = generateNumber(3);
  
  expect(range).toContain(result);
});

it('generate number between 1 and 6', () => {
  const range = [1, 2, 3, 4, 5, 6];
  const result = generateNumber(6);
  
  expect(range).toContain(result);
});

it('generate number between 1 and 9', () => {
  const range = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = generateNumber(9);
  
  expect(range).toContain(result);
});
