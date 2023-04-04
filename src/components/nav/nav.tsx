import { useNavigate } from 'react-router-dom';
import * as S from './nav.style';

const NavComponent = () => {
  const navigate = useNavigate();
  return (
    <S.Nav>
        <S.NavTitle onClick={()=>{navigate('/')}}>ProTeen</S.NavTitle>
        
        <S.NavBtnWrapper>
            <S.NavBtn onClick={()=>{navigate('/signup')}}>sign up</S.NavBtn>
        </S.NavBtnWrapper>
        <S.NavBtnWrapper>
            <S.NavBtn onClick={()=>{navigate('/signin')}}>sign in</S.NavBtn>
        </S.NavBtnWrapper>
    </S.Nav>
  );
};

export default NavComponent;
