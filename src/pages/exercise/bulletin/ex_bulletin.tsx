import React, { useState } from 'react';
import styled from 'styled-components';
import * as S from './ex_bulletin.style';
import Ex_img from '../register/img/Group 91.png';
import profile_img from './img/Ellipse 15.png';
import Icon_heart from './img/mdi_cards-heart-outline.png';
import Icon_book from './img/material-symbols_bookmark-outline-rounded.png';

const Ex_bulletin = () => {
  return (
    <S.Body>
      <S.AllContainer>
        <S.Title>Oh! 오운완</S.Title>
        <S.T_info>오늘의 운동을 기록하고 공유하세요.</S.T_info>

        <S.MainContainer>
          <S.Reels_view src={Ex_img} alt="Error" />

          <S.Write>
            <S.Date>
              <S.cDate>2023.04.02</S.cDate>
              <S.cTime>오전 10:00</S.cTime>
            </S.Date>
            <S.cTitle>오전 풀업! 오운완</S.cTitle>

            <S.profile>
              <S.profileImg src={profile_img} alt="Error" />
              <S.profileName>Steel Supplements</S.profileName>
            </S.profile>
            <S.cBar></S.cBar>

            <S.cWrite>오늘은 등하는날 ㅎㅎ</S.cWrite>
            <S.cWrite>나름 정자세로 한다고 했는데 왜 90점ㅇ이냐...</S.cWrite>
            <S.cWrite>내일은 평균 95점 찍는다!</S.cWrite>
            <S.cTag># 등 # 풀업 # 헬스 #health # PT # GYM</S.cTag>
            <S.cBar></S.cBar>
            <S.Click>
              <S.iconH src={Icon_heart} alt="Error" />
              <S.iconB src={Icon_book} alt="Error" />
            </S.Click>
            <S.Extag>Pull-up</S.Extag>
            <S.Record>
              <S.rContent>
                <S.rTitle>평균 점수</S.rTitle>
                <S.rTitle>운동 시간</S.rTitle>
                <S.rTitle>소모 칼로리</S.rTitle>
              </S.rContent>

              <S.rElement>
                <S.rElementB>78.2</S.rElementB>
                <S.rTime>
                  <S.rElementB>01</S.rElementB>
                  <S.rElementS>h</S.rElementS>
                  <S.rElementB>30</S.rElementB>
                  <S.rElementS>m</S.rElementS>
                </S.rTime>

                <S.rKcal>
                  <S.rElementB>150</S.rElementB>
                  <S.rElementS>kcal</S.rElementS>
                </S.rKcal>
              </S.rElement>
            </S.Record>
          </S.Write>
        </S.MainContainer>
      </S.AllContainer>
    </S.Body>
  );
};

export default Ex_bulletin;
