export const boxCount = (difficulty) => {
    
  if(difficulty === 'easy') return 3;
  if(difficulty === 'medium') return 4;
  if(difficulty === 'hard') return 8;

  return 0;
};

export const generateNumber = (maxNum) => {
  return Math.ceil(Math.random() * maxNum);
};
