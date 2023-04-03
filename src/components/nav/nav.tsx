import * as S from './nav.style';

const NavComponent = () => {
  return (
    <S.Nav>
        <S.NavTitle>ProTeen</S.NavTitle>
        
        <S.NavBtnWrapper>
            <S.NavBtn>sign up</S.NavBtn>
        </S.NavBtnWrapper>
        <S.NavBtnWrapper>
            <S.NavBtn>sign in</S.NavBtn>
        </S.NavBtnWrapper>
    </S.Nav>
  );
};

export default NavComponent;
