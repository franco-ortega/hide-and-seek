const boxCount = (difficulty) => {
  let boxes = 0;
    
  if(difficulty === 'easy') boxes = 3;
  if(difficulty === 'medium') boxes = 4;
  if(difficulty === 'hard') boxes = 8;

  return boxes;
};

const generateNumber = (maxNum) => {
  return Math.ceil(Math.random() * maxNum);
};

module.exports = { boxCount, generateNumber };
