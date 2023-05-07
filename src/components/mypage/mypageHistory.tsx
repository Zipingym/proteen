import * as S from './mypage.style';
import { useEffect, useState } from 'react';
import api from '$/api/customAxios';
import { Data } from './Types';

const History = () => {
  const token = localStorage.getItem('accessToken');
  const [scoreData, setScoreData] = useState<Data[] | null>();

  useEffect(() => {
    api
      .get('/exercise/get/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setScoreData(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <>
      {scoreData?.map((data) => (
        <S.EachHistoryWrapper key={data.exerciseId}>
          <S.StyledLabelWithStar>
            <span className="Star">*</span>
            <span className="Content">
              {data.createDateTime ? data.createDateTime.slice(5, 10) : '-'}
            </span>
          </S.StyledLabelWithStar>

          <S.HistoryVideo controls src={data.videoUrl} />
          <S.HistoryTitle>오전 풀업! 오운완</S.HistoryTitle>
        </S.EachHistoryWrapper>
      ))}
    </>
  );
};

export default History;
