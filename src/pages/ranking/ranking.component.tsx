import React from 'react';
import styled from 'styled-components';
import test from '../../assets/img/bgimg.svg';
import {useEffect, useState } from 'react';
import api from '$/api/customAxios';
import { sort } from 'fast-sort';

interface RankingData {
  name	:string
  total_calories:number
  avg_Score	:number
}

function RankingComponent() {
  const [rankingData, setRankingData] = useState<RankingData[]>()

  useEffect(()=>{
    api.get('/exercise/ranking')
    .then((res)=>{
      //여기 왜 type으로 any만 들어갈수 있을까?
      setRankingData(sort<any>(res.data).desc((data) => data.avg_Score))
    })
  },[])

  return (
    <div>
    {
      rankingData?.map((data,index)=>(
        <ComponentWrap>
          <RankingNumber>{index+1}</RankingNumber>
          <Profile src={test}></Profile>
          <Nickname>{data.name}</Nickname>
          <ContentWrap>
            <Score>{data.avg_Score}</Score>
            <Time>01h30m</Time>
            <Kcal>{data.total_calories}</Kcal>
            <Attendance>100</Attendance>
          </ContentWrap>
        </ComponentWrap>
      ))
    }
    </div>
  );
}
export default RankingComponent;

const ComponentWrap = styled.div`
  width: 85%;
  height: 60px;
  background-color: #494949;

  border-radius: 10px;

  display: flex;
  align-items: center;
  padding-left: 3%;
  box-sizing: border-box;
  margin-bottom: 0.5%;
`;
const RankingNumber = styled.div`
  font-size: 1.2em;
  color: white;
`;
const Profile = styled.img`
  border-radius: 100%;
  width: 40px;
  height: 40px;

  margin-left: 5%;
`;
const Nickname = styled.div`
  font-size: 1.2em;
  color: white;
  margin-left: 5%;
`;
const Score = styled.div`
  font-size: 1.2em;
  color: white;
`;
const Time = styled.div`
  font-size: 1.2em;
  color: white;
`;
const Kcal = styled.div`
  font-size: 1.2em;
  color: white;
`;
const Attendance = styled.div`
  font-size: 1.2em;
  color: white;
`;
const ContentWrap = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;

  margin-left: 20vh;
`;
