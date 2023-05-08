import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as S from './ex_register.style';
import Ex_img from './img/Group 91.png';
import Video from '../../../assets/img/video.svg';
import axios from 'axios';
import api from '$/api/customAxios';

import upload_icon from '../../../assets/img/upload_icon.svg';
import { title } from '../detailedRoutine/ex_detailedRoutine.style';
interface Post {
  title: string;
  body: string;
  exerciseType: string;
  score: number;
  time: number;
  calorie: number;
}

const Ex_register = () => {
  const token = localStorage.getItem('accessToken');
  const [post, setPost] = useState<Post>({
    title: '',
    body: '',
    exerciseType: '',
    score: 0,
    time: 0,
    calorie: 0,
  });
  const [type, setType] = useState([
    'PULLUP',
    'SQUAT',
    'LUNGE',
    'PLANK',
    'CRUNCH',
  ]);
  const [btnActive, setBtnActive] = useState('');
  const [fileUrl, setFileUrl] = useState<string>('');

  useEffect(() => {
    console.log(post);
  });

  const handleChangerUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
    console.log(name + value);
  };

  const onSubmit = (data: any) => {
    console.log(post);
    setPost({
      title: '',
      body: '',
      exerciseType: '',
      score: 0,
      time: 0,
      calorie: 0,
    });
    api
      .post('/exercise', {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        console.log('success');
        alert('운동 기록 업로드에 성공하였습니다');
      })
      .catch((err) => {
        console.log(err);
        // console.log()
      });
  };
  const VideoUpload = (e: any) => {
    setFileUrl(URL.createObjectURL(e.target.files[0]));
  };
  const videoInput = useRef();

  useEffect(() => {
    console.log(fileUrl == '');
  }, [fileUrl]);

  const onClickVideoUpload = () => {
    //@ts-expect-error
    videoInput.current.click();
  };
  return (
    <S.Body>
      <S.AllContainer>
        <S.Container>
          <S.Title>오늘의 운동기록</S.Title>
          <S.T_info>오늘 한 운동을 릴스로 기록해보세요.</S.T_info>

          <S.MainContainer>
            {/* <iframe
              width="560"
              height="620"
              src="https://www.youtube.com/embed/kL88ldYiMkM"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe> */}
            {fileUrl == '' ? (
              <>
                <S.VideoSubmit_btn onClick={onClickVideoUpload}>
                  <img src={Video} alt=""></img>
                </S.VideoSubmit_btn>
                <S.VideoSubmit
                  type="file"
                  style={{ display: 'none' }}
                  accept="video/*"
                  onChange={VideoUpload}
                  ref={videoInput}
                ></S.VideoSubmit>
              </>
            ) : (
              <video src={fileUrl} controls width="450px" />
            )}

            <S.Write>
              <S.InputWrapper height={10}>
                <S.Label>
                  <h4>제목</h4>
                  <h6>*</h6>
                </S.Label>
                <S.InputTitle
                  name="title"
                  type="text"
                  placeholder="제목"
                  onChange={handleChangerUser}
                  value={post.title}
                ></S.InputTitle>
              </S.InputWrapper>
              <S.InputWrapper height={40}>
                <S.Label>
                  <h4>운동 내용</h4>
                  <h6>*</h6>
                </S.Label>
                <S.InputInfo
                  name="body"
                  type="text"
                  placeholder="내용"
                  //@ts-expect-error
                  onChange={handleChangerUser}
                  value={post.body}
                ></S.InputInfo>
                <S.ChoseBtn>
                  {type.map((type: string, idx: number) => {
                    return (
                      <S.CB
                        name="exerciseType"
                        //@ts-expect-error
                        onClick={handleChangerUser}
                        value={type}
                        key={type}
                      >
                        {type}
                      </S.CB>
                    );
                  })}
                </S.ChoseBtn>
              </S.InputWrapper>
              <S.InputWrapper height={25}>
                <S.Label>
                  <h4>운동 기록</h4>
                  <h6>*</h6>
                </S.Label>
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
              </S.InputWrapper>
              <S.submit>
                <S.submitU onClick={onSubmit}>업로드</S.submitU>
              </S.submit>
            </S.Write>
          </S.MainContainer>
        </S.Container>
      </S.AllContainer>
    </S.Body>
  );
};

export default Ex_register;
