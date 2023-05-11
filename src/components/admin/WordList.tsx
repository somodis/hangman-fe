import React from 'react';

import { WordModel } from '../../models';

const WordList = ({ words }: { words: WordModel[] }) => {
  return <div>{words.map(({ word }) => word + ' ')}</div>;
};

export default WordList;
