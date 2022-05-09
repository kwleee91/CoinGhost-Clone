import styled from "styled-components";
import Link from "next/link";

const Container = styled.div``;

const RegisterHeader = styled.div`
  img._ {
    width: 390px;
    height: 66.6px;
    margin: 45px 0 30px 0;
    object-fit: contain;
  }
  .-Wallet- {
    width: 268px;
    height: 21px;
    margin-bottom: 26px;
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.16px;
    text-align: center;
    color: #6f94e9;
  }
  img._31 {
    width: 1920px;
    height: 1px;
    margin: ;
    object-fit: contain;
    background-color: #5382eb;
  }
`;

const RegisterWrapper = styled.div`
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    border: none;
  }
`;

const TermsConfirmAll = styled.div`
  display: flex;
  border-bottom: 1px solid #c6c6c6;
  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    object-fit: contain;
  }
  .\- {
    width: 461px;
    height: 36px;
    margin: ;
    font-family: SpoqaHanSansNeo;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #2b2b2b;
  }
`;

function Register() {
  return (
    <Container>
      <RegisterHeader>
        <Link href="/">
          <a>
            <div>
              <img
                src="/img/코인고스트_로고.jpg"
                srcset="/img/코인고스트_로고@2x.jpg 2x, /img/코인고스트_로고@3x.jpg 3x"
                className="_"
              />
            </div>
          </a>
        </Link>
        <div>
          <span className="-Wallet-">
            코인고스트 계정 및 Wallet을 생성합니다.
          </span>
        </div>
        <div>
          <img
            src="/img/선 1.png"
            srcset="/img/선 1@2x.png 2x, /img/선 1@3x.png 3x"
            className="_31"
          />
        </div>
      </RegisterHeader>
      <RegisterWrapper>
        <button>
          <TermsConfirmAll>
            <div>
              <img
                src="/img/체크박스.png"
                srcset="/img/체크박스@2x.png 2x, /img/체크박스@3x.png 3x"
              />
            </div>
            <span className="\-">
              코인고스트 이용약관, 개인정보 처리방침, 이벤트 및 정보 안내
              수신(선택)에 모두 동의합니다.
            </span>
          </TermsConfirmAll>
        </button>
      </RegisterWrapper>
    </Container>
  );
}

export default Register;
