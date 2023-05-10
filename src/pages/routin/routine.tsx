import React, {useState} from 'react';
import * as R from './routine.style';
import routinProfile from '../../assets/img/routinprofile.svg';
import RoutinComponent from './routine_component';
import data from './routine.json';
function Routin() {
  console.log(data);

  return (
    <R.Body>
      <R.Title>Exercise analysis</R.Title>
      <R.SubTitle>AI 모션인식으로 운동자세를 분석해보세요</R.SubTitle>
      <R.RoutinWrap>
        <R.RoutinProfile src={routinProfile}></R.RoutinProfile>
        <R.Routins>
            <RoutinComponent></RoutinComponent>;
        </R.Routins>
      </R.RoutinWrap>
    </R.Body>
  );
}
export default Routin;
