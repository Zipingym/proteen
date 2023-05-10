import { exerciseInfo } from '$/util/analysis';
import { useEffect, useState } from 'react';
import * as S from './feedback.style';
import { useNavigate } from 'react-router-dom';

const FeedBack = (props: {
  maxCount: number;
  score: exerciseInfo;
  videoUrl: string;
  record: MediaRecorder;
}) => {
  const [currentCount, setCurrentCount] = useState(0);
  const [textStyle, setTextStyle] = useState({
    color: 'white',
    fontWeight: '400',
    fontSize: '90%',
  });
  const [scores, setScores] = useState<number[]>([]);
  const [scroeSum, setScoreSum] = useState(0);
  const navigate = useNavigate();

  const onEnd = () => {
    props.record.stop();
  };
  useEffect(() => {
    if (props.videoUrl != '') {
      navigate('/exercise/register', {
        state: {
          average: isNaN(scroeSum / currentCount)
            ? 0
            : Math.round((scroeSum / currentCount) * 10) / 10,
          count: currentCount,
          video: props.videoUrl,
        },
      });
    }
  }, [props.videoUrl]);
  // const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    if (props.score.score > 0) {
      setScores((prev) => [...prev, Math.round(props.score.score)]);
      setTextStyle({ color: '#1df659', fontWeight: '500', fontSize: '100%' });
    }

    setCurrentCount(currentCount + props.score.count);
    setScoreSum(scroeSum + props.score.score * props.score.count);
  }, [props.score]);

  return (
    <S.bottomContent>
      <S.btmTitle>Feed Back</S.btmTitle>
      <S.exPoint>
        <S.exPoint1>
          <S.exCount
            style={{
              color: `${textStyle.color}`,
              fontWeight: `${textStyle.fontWeight}`,
              fontSize: `${textStyle.fontSize}`,
            }}
          >
            운동 갯수
          </S.exCount>
          <S.exCounter style={{ color: `${textStyle.color}` }}>
            {currentCount} / {props.maxCount}
          </S.exCounter>
        </S.exPoint1>
        <S.exPoint2>
          <S.exAvg
            style={{
              color: `${textStyle.color}`,
              fontWeight: `${textStyle.fontWeight}`,
              fontSize: `${textStyle.fontSize}`,
            }}
          >
            평균점수
          </S.exAvg>
          <S.exAvgPoint style={{ color: `${textStyle.color}` }}>
            {isNaN(scroeSum / currentCount)
              ? 0
              : Math.round((scroeSum / currentCount) * 10) / 10}
          </S.exAvgPoint>
        </S.exPoint2>
      </S.exPoint>
      <S.exBar>
        {scores.map((score) => (
          <S.pointCheckBar score={score}></S.pointCheckBar>
        ))}
      </S.exBar>
      <S.EndButton onClick={onEnd}>완료!</S.EndButton>
      {/* <S.pointCheckScore>{currentScore}</S.pointCheckScore> */}
    </S.bottomContent>
  );
};

export default FeedBack;
