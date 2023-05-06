import styled from 'styled-components';

export const Body = styled.body`
  height: 100vh;
  background: #252525;
  position: relative;
  display: flex;
`;
export const topContent = styled.div`
  display: flex;
  height: 60%;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
`;
export const topImg1 = styled.img`
  width: 65%;
  height: 400px;
`;

export const exTitle = styled.div`
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const routine = styled.h5`
  font-style: normal;
  font-weight: 300;
  font-size: 10%;
`;

export const topImg2 = styled.img`
  padding-right: 2%;
  width: 2.5%;
`;

export const title = styled.h1`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 150%;
`;
export const info = styled.h3`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 250;
  font-size: 100%;
`;

export const topVideo = styled.iframe`
  float: right;
  width: 100%;
  height: 70%;
`;

export const topBar = styled.div`
  display: flex;
  height: 1.5%;
  width: 100%;
`;

export const topBar1 = styled.div`
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 50%;
`;

export const topBar2 = styled.div`
  background: rgba(255, 255, 255, 0.1);
  height: 100%;
  width: 50%;
`;

export const BottomImg1 = styled.img`
  width: 28%;
  margin-top: 1.5%;
  margin-left: 15%;
`;

export const WebcamWrapper = styled.div`
  position: relative;
  height: calc(100% - 5rem);
  top: 5rem;
`;

export const Contents = styled.div`
  width: 100%;
  position: relative;
  height: calc(100% - 5rem);
  top: 5rem;
  padding: 1rem;
  box-sizing: border-box;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;
