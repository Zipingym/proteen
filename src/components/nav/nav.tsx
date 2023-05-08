import { useNavigate } from 'react-router-dom';
import * as S from './nav.style';
import {useState} from 'react';

const NavComponent = () => {
  const navigate = useNavigate();
  const [token,setToken] = useState(localStorage.getItem('accessToken'))
  return (
    <S.Nav>
      <S.NavTitle
        onClick={() => {
          navigate('/');
        }}
      >
        ProTeen
      </S.NavTitle>

      {token ? 
      <>
      <S.NavBtnWrapper>
        <S.NavBtn onClick={()=>{navigate('/mypage')}}>
          mypage
        </S.NavBtn>
      </S.NavBtnWrapper>
      <S.NavBtnWrapper>
      <S.NavBtn onClick={()=>{localStorage.removeItem('accessToken'); setToken(null)}}>
        logout
      </S.NavBtn>
    </S.NavBtnWrapper>
    </>
      : 
      <>
      <S.NavBtnWrapper>
        <S.NavBtn
          onClick={() => {
            navigate('/signup');
          }}
        >
          sign up
        </S.NavBtn>
      </S.NavBtnWrapper>
      <S.NavBtnWrapper>
        <S.NavBtn
          onClick={() => {
            navigate('/signin');
          }}
        >
          sign in
        </S.NavBtn>
      </S.NavBtnWrapper>
      </>}
    </S.Nav>
  );
};

export default NavComponent;
