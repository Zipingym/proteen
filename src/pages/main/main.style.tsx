import styled from 'styled-components';
import bg1 from '../../../public/bg1.svg';
import AOS from 'aos';
export const MainWrap = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #252525;
`;
export const Main1 = styled.div`
  width: 100%;
  background-image: url(/image/bg1.svg);
  background-repeat: no-repeat;
  background-size: cover;
`;
export const Main2 = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  background-image: url(/image/bg2.svg);
  background-repeat: no-repeat;
  background-size: cover;

  align-items: center;
`;
export const Main3 = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(/image/bg3.svg);
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const TitleWrap = styled.div`
  width: 40vw;
  height: 780px;

  display: flex;
  justify-content: end;
  display: flex;
  flex-direction: column;
  z-index: 1;

  margin-left: 10%;
`;

export const Title = styled.div`
  font-size: 2em;
  color: white;
`;
export const PtTitle = styled.div`
  font-size: 5em;
  font-weight: 700;
  color: white;
  text-shadow: 4px 2px 2px #1df65990;
`;
export const BtnWrap = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
`;
export const Text = styled.div<{
  size: string;
  margin: string;
  weight: number;
}>`
  font-size: ${(props) => props.size};
  color: white;
  margin-bottom: ${(props) => props.margin};
  font-weight: ${(props) => props.weight};
`;

export const StartBtn = styled.img`
  margin-top: 30px;
  width: 400px;
  z-index: 1;
`;
export const Dumbel = styled.img`
  width: 400px;
  margin: 10%;
  margin-left: 15%;
`;
export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
`;
export const Frame2 = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: row;
  :hover {
    cursor: pointer;
  }
`;
