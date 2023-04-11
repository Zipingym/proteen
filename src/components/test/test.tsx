import { useState } from 'react';
import * as S from './test.style';

const TestComponent = () => {
  const [number, setNumber] = useState(0);

  const Increase = () => {
    setNumber(number + 1);
  };

  const Decrease = () => {
    setNumber(number > 0 ? number - 1 : 0);
  };

  return (
    <S.content>
      <div>This is Test Component</div>
      <h1>you can increase and decrease</h1>
      <div>
        <br />
        {number}
      </div>
      <button onClick={Increase}>+</button>
      <button onClick={Decrease}>-</button>
      {number == 0 ? <div>no you can't</div> : ''}
    </S.content>
  );
};

export default TestComponent;
