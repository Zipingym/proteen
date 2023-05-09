import { exerciseInfo } from '$/util/analysis';
import { useEffect, useState } from 'react';
import * as S from './feedback.style';
import { useNavigate } from 'react-router-dom';

const FeedBack = (props: { maxCount: number; score: exerciseInfo }) => {
  const [comment, setComment] = useState('한번만!');
  const [currentCount, setCurrentCount] = useState(0);
  const [scores,setScores] = useState<number[]>([])
  const [scroeSum, setScoreSum] = useState(0);
  const navigate = useNavigate();

  const onEnd = () => {
    navigate('/exercise/register', {
      state: {
        average: isNaN(scroeSum / currentCount)
          ? 0
          : Math.round((scroeSum / currentCount) * 10) / 10,
        count: currentCount,
      },
    });
  };
  // const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    if (props.score.score > 0){
      setScores((prev) => [...prev,Math.round(props.score.score)])
    }
    setCurrentCount(currentCount + props.score.count);
    setScoreSum(scroeSum + props.score.score * props.score.count);
  }, [props.score]);

  useEffect(() => {
    console.log(scores);
  },[scores])
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
      <S.exBar>
        {
          scores.map((score) => (
            <S.pointCheckBar score={score} ></S.pointCheckBar>
            ))
          }
      </S.exBar>
      <S.EndButton onClick={onEnd}>완료!</S.EndButton>
      {/* <S.pointCheckScore>{currentScore}</S.pointCheckScore> */}
    </S.bottomContent>
  );
};

export default FeedBack;
