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
  attendance:number
  total_Time:number
}

//props에 왜 any만 들어갈 수 있지
function RankingComponent({exercise}:any) {
  const [rankingData, setRankingData] = useState<RankingData[]>()

  useEffect(()=>{
    api.get(`/exercise/ranking?exerciseType=${exercise}`)
    .then((res)=>{
      //여기 왜 type으로 any만 들어갈수 있을까?
      setRankingData(sort<any>(res.data).desc((data) => data.avg_Score))
    })
  },[exercise])

  return (
    <div>
    {
      rankingData?.map((data,index)=>(
        <ComponentWrap>
          <RankingNumber>{index+1}</RankingNumber>
          <Profile src={test}></Profile>
          <Nickname>{data.name}</Nickname>
          <ContentWrap>
            <Score>{(data.avg_Score).toString().slice(0,6)}</Score>
            <Time>{(data.total_Time)/3600}h{(data.total_Time)%3600}m</Time>
            <Kcal>{data.total_calories}</Kcal>
            <Kcal>{data.attendance}</Kcal>
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
  width: 12%;
  font-size: 1.2em;
  color: white;
  margin-left: 11%;
`;
const Score = styled.div`
  font-size: 1.2em;
  color: white;
  width: 20%;
`;
const Time = styled.div`
  font-size: 1.2em;
  color: white;
  width: 20%;
`;
const Kcal = styled.div`
  font-size: 1.2em;
  color: white;
  margin-left: 2rem;
  width: 20%;
`;
const ContentWrap = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;

  margin-left: 20vh;
`;
