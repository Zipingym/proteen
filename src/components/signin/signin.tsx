
import * as S from "./signin.style";

const signin = () => {

    return(
        <S.BackImage>
            <S.BackBlur>
                <S.SignInTitle>Sign In</S.SignInTitle>
                <S.Explanation>ProTeen과 함께 운동을 시작해보세요.</S.Explanation>

                <S.ContentWrapper>
                    <S.ComponentLabel>Id</S.ComponentLabel>
                    <S.ActiveInput></S.ActiveInput>
                </S.ContentWrapper>

                <S.ContentWrapper>
                    <S.ComponentLabel>Pw</S.ComponentLabel>
                    <S.WarningInput type="password"></S.WarningInput>
                </S.ContentWrapper>
                <S.GotoSignup>회원정보가 없으십니까?</S.GotoSignup>

                <S.WarningMsg>*아이디, 비밀번호가 올바르지 않습니다.<br/>다시 시도해 주세요.</S.WarningMsg>

                <S.SubmitBtn>ProTeen 입장</S.SubmitBtn>

            </S.BackBlur>
        </S.BackImage>
    )
}

export default signin;
