import * as S from './feedback.style';

const FeedBack = (props: {
  comment: string;
  currentCount: number;
  maxCount: number;
  averageScore: number;
  currentScore: number;
}) => {
  return (
    <S.bottomContent>
      <S.btmTitle>Feed Back</S.btmTitle>
      <S.btmInfo>{props.comment}</S.btmInfo>
      <S.exPoint>
        <S.exPoint1>
          <S.exCount>운동 갯수</S.exCount>
          <S.exCounter>
            {props.currentCount} / {props.maxCount}
          </S.exCounter>
        </S.exPoint1>
        <S.exPoint2>
          <S.exAvg>평균점수</S.exAvg>
          <S.exAvgPoint>{props.averageScore}</S.exAvgPoint>
        </S.exPoint2>
      </S.exPoint>
      <S.exBar></S.exBar>
      <S.pointCheckBar></S.pointCheckBar>
      <S.pointCheckScore>{props.currentScore}</S.pointCheckScore>
    </S.bottomContent>
  );
};

export default FeedBack;
