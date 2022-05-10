import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <Container>
      <Link href="/">
        <a>
          <ImgContainer>
            <Image //
              src="/img/코인고스트_로고.jpg"
              width={390}
              height={66.6}
            />
          </ImgContainer>
        </a>
      </Link>
      <TermsTitle>코인고스트 계정 및 Wallet을 생성합니다.</TermsTitle>
      <ImgContainer>
        <Image //
          src="/img/선 1.png"
          width={1920}
          height={1}
        />
      </ImgContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ImgContainer = styled.div`
  margin-top: 45px;
`;
const TermsTitle = styled.span`
  margin-top: 29px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  letter-spacing: -0.16px;
  color: #6f94e9;
`;
