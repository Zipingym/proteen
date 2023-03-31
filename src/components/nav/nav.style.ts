import { AccentColor, NavHeight } from '$/style/global';
import styled from 'styled-components';

export const NavWrapper = styled.div`
  height: ${NavHeight}px;
  background-color: rgba(120, 120, 120, 0.6);
  position: absolute;
  width: 100%;
  z-index: 99;
`;

export const NavCore = styled.div`
  width: 80%;
  padding: 0 10%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: 36px;
    letter-spacing: -0.02em;
    color: ${AccentColor};
  }
`;

export const AuthNavCotnainer = styled.div`
  width: 20%;
  min-width: 15em;
  max-width: 21em;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 70%;
`;

export const AuthNavButton = styled.button`
  border-radius: 0.5em;
  font-size: inherit;
  border: none;
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  padding: 0.5em;
  h6 {
    border-radius: inherit;
    font-size: inherit;
    font-weight: bold;
    color: #ddd;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 0.35em 0.7em;
    outline: 2px solid ${AccentColor};
  }
`;
