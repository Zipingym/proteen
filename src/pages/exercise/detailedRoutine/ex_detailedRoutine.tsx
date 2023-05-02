import React from 'react';
import styled from 'styled-components';
import * as S from './ex_detailedRoutine.style';
import DetailedImg1 from './img/image 5.png';
import DetailedImg2 from './img/Polygon 2.png';
import DetailedImg3 from './img/Group 99.png';
import Youtub from 'react-youtube';

const ex_detailedRoutine = () => {
  return (
    <S.Body>
      <S.topContent>
        <S.topImg1 src={DetailedImg1} alt="Error" />

        <S.exTitle>
          <S.routine>
            <S.topImg2 src={DetailedImg2} alt="Error" />
            복근 루틴 1/12
          </S.routine>
          <S.title>크런치</S.title>
          <S.info>
            복근 중 상부를 강화하는 운동으로 윗몸 일으키기의 변형 동작
          </S.info>
          <S.topVideo
            width="380"
            height="230"
            src="https://www.youtube.com/embed/uxiSkR-oqqs"
            title="YouTube video player"
          />
        </S.exTitle>
      </S.topContent>
      <S.topBar>
        <S.topBar1></S.topBar1>
        <S.topBar2></S.topBar2>
      </S.topBar>
      <S.BottomImg1 src={DetailedImg3} alt="Error" />
      <S.bottomContent>
        <S.btmTitle>Feed Back</S.btmTitle>
        <S.btmInfo>자세가 좋아요! 이대로 조금만 더!</S.btmInfo>

        <S.exPoint>
          <S.exPoint1>
            <S.exCount>운동 갯수</S.exCount>
            <S.exCounter>15/30</S.exCounter>
          </S.exPoint1>
          <S.exPoint2>
            <S.exAvg>평균점수</S.exAvg>
            <S.exAvgPoint>78.2</S.exAvgPoint>
          </S.exPoint2>
        </S.exPoint>
        <S.exBar></S.exBar>
        <S.pointCheckBar></S.pointCheckBar>
        <S.pointCheckScore>74.2</S.pointCheckScore>
      </S.bottomContent>
    </S.Body>
  );
};

export default ex_detailedRoutine;
