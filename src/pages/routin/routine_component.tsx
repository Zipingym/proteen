import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Routine from './routine';
import OnBtn from '../../assets/img/onBtn.svg';
import OffBtn from '../../assets/img/offBtn.svg';
import { useNavigate } from 'react-router-dom';

function RoutinComponent() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [routine, setRoutine] = useState([
    {
      date: '2023.04.13',
      title: '플랭크 (plank)',
      set: '10개 / 2set',
    },
    {
      date: '2023.04.12',
      title: '풀업 (pull-up)',
      set: '30개 / 3set',
    },
    {
      date: '2023.04.11',
      title: '플랭크 (plank)',
      set: '10개 / 2set',
    },
    {
      date: '2023.04.10',
      title: '풀업 (pull-up)',
      set: '30개 / 1set',
    },
    {
      date: '2023.04.09',
      title: '풀업 (pull-up) ',
      set: '30개 / 1set',
    },
    {
      date: '2023.04.08',
      title: '플랭크 (plank)',
      set: '10개 / 1set',
    },
    {
      date: '2023.04.07',
      title: '플랭크 (plank)',
      set: '30개 / 1set',
    },
    {
      date: '2023.04.06',
      title: '플랭크 (plank)',
      set: '20개 / 1set',
    },
    {
      date: '2023.04.05',
      title: '플랭크 (plank)',
      set: '30개 / 1set',
    },
  ]);

  return routine.map((data, index) => (
    <ComponentWrap
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      key={index}
    >
      <RoutineDate>{data.date}</RoutineDate>

      <RoutineTitle>{data.title}</RoutineTitle>
      <RoutineSet>{data.set}</RoutineSet>
      {hover ? (
        <RoutineBtn
          src={OnBtn}
          onClick={() => {
            navigate('/exercise/detailedRoutine');
          }}
        />
      ) : (
        <RoutineBtn src={OffBtn} />
      )}
    </ComponentWrap>
  ));
}
export default RoutinComponent;
const ComponentWrap = styled.div`
  width: 40vw;
  height: 10%;
  background-color: #494949;
  color: white;

  border-radius: 5px;
  margin-bottom: 1%;
  margin-top: 1%;

  display: flex;
  align-items: center;
  padding-left: 5%;
  box-sizing: border-box;

  &:hover {
    background-color: #1df65940;
    transition: 0.3s;
  }
`;
const RoutineDate = styled.div`
  margin-right: 35%;
`;
const RoutineTitle = styled.div``;
const RoutineSet = styled.div`
  margin-left: 3%;
`;
const RoutineBtn = styled.img`
  margin-left: 9%;
`;
