
import * as S from "./signup.style";

const signup = () => {
    
    return(
        <S.BackImage>
            <S.BackBlur>
                <S.ProTeenTitle>ProTeen</S.ProTeenTitle>
                <S.SignUpTitle>Sign Up</S.SignUpTitle>
                <S.Explanation>ProTeen과 함께 운동을 시작해보세요.</S.Explanation>
                
                <S.ContentWrapper>
                    <S.ComponentLabel>Name</S.ComponentLabel>
                    <S.ActiveInput></S.ActiveInput>
                </S.ContentWrapper>

                <S.align>
                    <S.ContentWrapper>
                            <S.ComponentLabel>Age</S.ComponentLabel>
                            <S.HalfSelect placeholder="나이를 선택해 주세요."></S.HalfSelect>
                    </S.ContentWrapper>

                    <S.HalfContentWrapper>
                        <S.ComponentLabel>Gender</S.ComponentLabel>
                        <S.HalfSelect placeholder="나이를 선택해 주세요."></S.HalfSelect>
                    </S.HalfContentWrapper>
                </S.align>

                <S.ContentWrapper>
                    <S.ComponentLabel>Id</S.ComponentLabel>
                    <S.InactiveInput placeholder="아이디를 입력해 주세요."></S.InactiveInput>
                </S.ContentWrapper>

                <S.ContentWrapper>
                    <S.ComponentLabel>Pw</S.ComponentLabel>
                    <S.InactiveInput type="password" placeholder="비밀번호를 입력해 주세요."></S.InactiveInput>
                </S.ContentWrapper>

                <S.SubmitBtn>ProTeen 가입</S.SubmitBtn>

            </S.BackBlur>
        </S.BackImage>
    )
}

export default signup;