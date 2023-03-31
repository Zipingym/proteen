import * as S from './nav.style';

const NavComponent = () => {
  return (
    <S.NavWrapper>
      <S.NavCore>
        <h1>ProTeen</h1>
        <S.AuthNavCotnainer>
          <S.AuthNavButton>
            <h6>sign up</h6>
          </S.AuthNavButton>
          <S.AuthNavButton>
            <h6>sign in</h6>
          </S.AuthNavButton>
        </S.AuthNavCotnainer>
      </S.NavCore>
    </S.NavWrapper>
  );
};

export default NavComponent;
