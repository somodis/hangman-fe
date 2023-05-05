import React from 'react';

import words from '../../assets/words.json';

const WordList = () => {
  return <div>{words.map((word) => word + ' ')}</div>;
};

export default WordList;
