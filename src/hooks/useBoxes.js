// import { useState } from 'react';

export const useBoxes = () => {
  
  const boxCount = (difficulty) => {
    let boxes = 0;
    
    if(difficulty === 'easy') boxes = 3;
    if(difficulty === 'medium') boxes = 6;
    if(difficulty === 'hard') boxes = 9;
    console.log('BOXES: ' + boxes);

    return boxes;
  };

  return {
    boxCount,
  };
};
