const boxCount = (difficulty) => {
  let boxes = 0;
    
  if(difficulty === 'easy') boxes = 3;
  if(difficulty === 'medium') boxes = 6;
  if(difficulty === 'hard') boxes = 9;

  return boxes;
};

const generateNumber = (maxNum) => {
  return Math.ceil(Math.random() * maxNum);
};

module.exports = { boxCount, generateNumber };
