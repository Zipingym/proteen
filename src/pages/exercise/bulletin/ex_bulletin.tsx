import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as S from './ex_bulletin.style';
import Ex_img from '../register/img/Group 91.png';
import profile_img from './img/Ellipse 15.png';
import Icon_heart from './img/mdi_cards-heart-outline.png';
import Icon_book from './img/material-symbols_bookmark-outline-rounded.png';
import api from '$/api/customAxios';
import axios from 'axios';

interface GetItem {
      body: string;
      createDate: string;
      createTime: string;
      exerciseId: number;
      exerciseType: string;
      score: number;
      time: number;
      title: string;
      videoUrl: string;
      user: {
        id: string;
      };
}

const Ex_bulletin = () => {
  
const [getItem, setGetItem] = useState<GetItem[]>([
      {
        body: '',
        createDate: '',
        createTime: '',
        exerciseId: 0,
        exerciseType: '',
        score: 0,
        time: 0,
        title: '',
        videoUrl: '',
        user: {
          id: '',
        },
      }
  ]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    api
      .get('/exercise/get/list', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setGetItem(() => res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(getItem);
  },[getItem])

  return (
    <S.Body>
      <S.AllContainer>
        <S.Title>Oh! 오운완</S.Title>
        <S.T_info>오늘의 운동을 기록하고 공유하세요.</S.T_info>
        <S.ScrollContainer>
          { getItem[0].title &&
          getItem.map((data: any, idx: number) => {
            return ( <S.MainContainer key={idx}>
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
                      <S.cDate key={idx}>
                        {data.createDate}
                      </S.cDate>
                      <S.cTime key={idx}>
                        {data.createTime}
                      </S.cTime>
                    </S.Date>
                    <S.cTitle key={idx}>{data.title}</S.cTitle>

                    <S.profile>
                      <S.profileImg src={profile_img} alt="Error" />
                      <S.profileName key={idx}>
                        {data.user.id}
                      </S.profileName>
                    </S.profile>
                    <S.cBar></S.cBar>

                    <S.cWrite></S.cWrite>
                    <S.cTag># 등 # 풀업 # 헬스 #health # PT # GYM</S.cTag>
                    <S.cBar></S.cBar>
                    <S.Click>
                      <S.iconH src={Icon_heart} alt="Error" />
                      <S.iconB src={Icon_book} alt="Error" />
                    </S.Click>
                    <S.Extag key={idx}>
                      {data.exerciseType}
                    </S.Extag>
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
              )}
            )}
        </S.ScrollContainer>
      </S.AllContainer>
    </S.Body>
  );
};

export default Ex_bulletin;
