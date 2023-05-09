import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as S from './ex_bulletin.style';
import Ex_img from '../register/img/Group 91.png';
import profile_img from './img/Ellipse 15.png';
import Icon_heart from './img/mdi_cards-heart-outline.png';
import Icon_book from './img/material-symbols_bookmark-outline-rounded.png';
import api from '$/api/customAxios';
import axios from 'axios';

const Ex_bulletin = () => {
  interface GetItem {
    createDateTime: string;
    modifiedDateTime: string;
    exerciseId: number;
    title: string;
    body: string;
    exerciseType: string;
    videoUrl: string;
    score: number;
    time: number;
    calorie: number;
    user: {
      createDateTime: string;
      modifiedDateTime: string;
      userId: number;
      id: string;
      password: string;
      name: string;
      age: number;
      gender: string;
    };
  }

  const [getItem, setGetItem] = useState<GetItem>({
    createDateTime: '',
    modifiedDateTime: '',
    exerciseId: 0,
    title: '',
    body: '',
    exerciseType: '',
    videoUrl: '',
    score: 0,
    time: 0,
    calorie: 0,
    user: {
      createDateTime: '',
      modifiedDateTime: '',
      userId: 0,
      id: '',
      password: '',
      name: '',
      age: 0,
      gender: '',
    },
  });
  const token = localStorage.getItem('accessToken');
  useEffect(() => {
    api
      .get('/exercise/get/list', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setGetItem(res.data[0]);
        console.log(getItem);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <S.Body>
      <S.AllContainer>
        <S.Title>Oh! 오운완</S.Title>
        <S.T_info>오늘의 운동을 기록하고 공유하세요.</S.T_info>
        <S.ScrollContainer>
          <S.MainContainer>
            <iframe
              width="560"
              height="620"
              src="https://www.youtube.com/embed/kL88ldYiMkM"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <S.Write>
              <S.Date>
                <S.cDate>{getItem.createDateTime}</S.cDate>
                <S.cTime>{getItem.time}</S.cTime>
              </S.Date>
              <S.cTitle>{getItem.title}</S.cTitle>

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
          <S.MainContainer>
            <iframe
              width="560"
              height="620"
              src="https://www.youtube.com/embed/kL88ldYiMkM"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>

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
        </S.ScrollContainer>
      </S.AllContainer>
    </S.Body>
  );
};

export default Ex_bulletin;
