import styled from 'styled-components';
import authBackground from '../../../static/authBackground.svg';
import BackBlurImg from '../../../static/BackBlurImg.svg';

export const BackImage = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${authBackground});
  background-repeat: no-repeat;
  background-size: cover;

  position: absolute;
`;

export const BackBlur = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(252.44deg, rgba(1, 3, 40, 0) 0%, #000000 100%);
  position: absolute;
`;

export const ProTeenTitle = styled.div`
  margin-left: 10rem;
  margin-top: 1.5rem;

  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 2rem;
  letter-spacing: -0.02em;

  color: #1df659;
  :hover {
    cursor: pointer;
  }
`;

export const SignUpTitle = styled.div`
  margin-top: 12rem;
  margin-left: 10.1rem;

  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 2.2rem;
  letter-spacing: -0.02em;

  color: #ffffff;
`;

export const Explanation = styled.div`
  margin-left: 10.1rem;
  margin-top: 0.5rem;

  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 1.5rem;
  letter-spacing: -0.02em;

  color: #7e7e7e;
`;

export const ComponentLabel = styled.div`
  margin-left: 0.3rem;

  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 1.2rem;
  letter-spacing: -0.02em;

  color: #ffffff;
`;

export const ContentWrapper = styled.div`
  margin-top: 2rem;
  margin-left: 9.5rem;
`;

export const InactiveInput = styled.input`
  margin-top: 0.7rem;

  background: rgba(37, 37, 37, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 15px;

  width: 26rem;
  height: 3rem;

  padding-left: 0.9rem;

  font-family: 'Pretendard';
  font-size: 1rem;
  color: #ffffff;
  ::placeholder {
    color: #7b7b7b;
  }
`;

export const ActiveInput = styled.input`
  margin-top: 0.7rem;
  padding-left: 0.9rem;

  width: 26rem;
  height: 3rem;

  background: #0a0a14;
  border: 3px solid #494949;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;

  font-family: 'Pretendard';
  font-size: 17px;
  color: #ffffff;
`;

export const HalfSelect = styled.select`
  margin-top: 0.7rem;

  width: 13rem;
  height: 3rem;
  background: rgba(37, 37, 37, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 15px;
`;

export const HalfContentWrapper = styled.div`
  margin-top: 2rem;
  margin-left: 1.5rem;
`;

export const align = styled.div`
  display: flex;
  align-items: center;
`;

export const SubmitBtn = styled.button`
  margin-left: 9.8rem;
  margin-top: 2.8rem;

  width: 10rem;
  height: 3rem;
  background: #1df659;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 5px;

  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 1rem;
  color: #252525;
`;
