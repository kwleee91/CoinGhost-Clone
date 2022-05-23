import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const ListNav = () => {
  return (
    <Container>
      <Header>
        <Image src="/img/bars.svg" alt="bars" width={50} height={37} />
        <span>블로고</span>
        <Link href="/register">
          <a>
            <span>회원가입</span>
          </a>
        </Link>
      </Header>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px 0;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: ${({ theme }) => theme.fonts.size.xxl};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    color: ${({ theme }) => theme.colors.blue};
  }
`;

export default ListNav;
