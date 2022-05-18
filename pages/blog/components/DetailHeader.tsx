import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const DetailHeader = () => {
  return (
    <>
      <Header>
        <Link href="/blog">
          <a>
            <Image
              src="/img/next.png"
              alt="arrow-button"
              width={34}
              height={34}
            />
          </a>
        </Link>
        <Link href="/">
          <a>
            <Image
              src="/img/logo-white.png"
              alt="logo"
              width={318}
              height={54.7}
            />
          </a>
        </Link>
        <span></span>
      </Header>
    </>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 42px 30px;
  background-color: ${(props) => props.theme.colors.blue};
`;

export default DetailHeader;
