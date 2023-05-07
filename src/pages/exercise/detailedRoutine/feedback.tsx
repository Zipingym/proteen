import { exerciseInfo } from '$/util/analysis';
import { useEffect, useState } from 'react';
import * as S from './feedback.style';

const FeedBack = (props: { maxCount: number; score: exerciseInfo }) => {
  const [comment, setComment] = useState('한번만!');
  const [currentCount, setCurrentCount] = useState(0);
  const [scroeSum, setScoreSum] = useState(0);
  // const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    setCurrentCount(currentCount + props.score.count);
    setScoreSum(scroeSum + props.score.score * props.score.count);
  }, [props.score]);
  return (
    <S.bottomContent>
      <S.btmTitle>Feed Back</S.btmTitle>
      <S.btmInfo>{comment}</S.btmInfo>
      <S.exPoint>
        <S.exPoint1>
          <S.exCount>운동 갯수</S.exCount>
          <S.exCounter>
            {currentCount} / {props.maxCount}
          </S.exCounter>
        </S.exPoint1>
        <S.exPoint2>
          <S.exAvg>평균점수</S.exAvg>
          <S.exAvgPoint>
            {isNaN(scroeSum / currentCount)
              ? 0
              : Math.round((scroeSum / currentCount) * 10) / 10}
          </S.exAvgPoint>
        </S.exPoint2>
      </S.exPoint>
      <S.exBar></S.exBar>
      <S.pointCheckBar></S.pointCheckBar>
      {/* <S.pointCheckScore>{currentScore}</S.pointCheckScore> */}
    </S.bottomContent>
  );
};

export default FeedBack;
