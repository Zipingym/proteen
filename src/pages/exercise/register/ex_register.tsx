import React, { useState } from 'react';
import styled from 'styled-components';
import * as S from './ex_register.style';
import Ex_img from './img/Group 91.png';

const Ex_register = () => {
  const [type, setType] = useState([
    'Pull-up',
    'Squat',
    'Lunge',
    'Plank',
    'Crunch',
  ]);
  return (
    <S.Body>
      <S.AllContainer>
        <S.Title>오늘의 운동기록</S.Title>
        <S.T_info>오늘 한 운동을 릴스로 기록해보세요.</S.T_info>

        <S.MainContainer>
          <S.Reels_view src={Ex_img} alt="Error" />

          <S.Write>
            <S.InputWrapper height={10}>
              <S.Label>
                <h4>제목</h4>
                <h6>*</h6>
              </S.Label>
              <S.InputTitle></S.InputTitle>
            </S.InputWrapper>
            <S.InputWrapper height={40}>
              <S.Label>
                <h4>운동 내용</h4>
                <h6>*</h6>
              </S.Label>
              <S.InputInfo></S.InputInfo>
              <S.ChoseBtn>
                {type.map((type: string) => {
                  return (
                    <S.CB>
                      <pre> {type} </pre>
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
              <S.submitU>업로드</S.submitU>
            </S.submit>

            {/* <S.Content>
              <S.cTitle>제목</S.cTitle>
              <S.cSymbol>*</S.cSymbol>
            </S.Content>
            <S.inputTitle type="text" placeholder="제목을 입력해 주세요." />

            <S.Content>
              <S.cTitle>운동</S.cTitle>
              <S.cSymbol>*</S.cSymbol>
            </S.Content>
            <S.inputInfo placeholder="운동 내용을 작성해 주세요." />

            <S.ChoseBtn>
              <S.CB>
                <pre> Pull-up </pre>
              </S.CB>
              <S.CB>
                <pre> Squat </pre>
              </S.CB>
              <S.CB>
                <pre> Lunge </pre>
              </S.CB>
              <S.CB>
                <pre> Plank </pre>
              </S.CB>
              <S.CB>
                <pre> Crunch </pre>
              </S.CB>
            </S.ChoseBtn>

            <S.Content>
              <S.cTitle>운동 기록</S.cTitle>
              <S.cSymbol>*</S.cSymbol>
            </S.Content>

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
              <S.submit>
                <S.submitU>업로드</S.submitU>
              </S.submit>
            </S.Record> */}
          </S.Write>
        </S.MainContainer>
      </S.AllContainer>
    </S.Body>
  );
};

export default Ex_register;
