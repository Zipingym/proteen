import * as S from './mypage.style';
import { useEffect, useState } from 'react';
import api from '$/api/customAxios';
import { Data } from './Types';

const Score = () => {
  const token = localStorage.getItem('accessToken');
  const [scoreData, setScoreData] = useState<Data[]>([]);

  useEffect(() => {
    api
      .get('/exercise/get/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setScoreData(res.data);
      });
  }, []);

  return (
    <>
      {scoreData?.map((data) => (
        <S.TimeContent key={data.exerciseId}>
          <S.TimeGraphWrapper>
            <S.TimeGraph height={(data.score * 0.08).toString() + 'vh'} />
          </S.TimeGraphWrapper>
          <S.Hr />
          <S.StyledLabel weight="300" size="0.8rem">
            {data.createDateTime ? data.createDateTime.slice(5, 10) : '-'}
          </S.StyledLabel>
        </S.TimeContent>
      ))}
    </>
  );
};

export default Score;
