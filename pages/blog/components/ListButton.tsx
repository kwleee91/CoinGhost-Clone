// import type { NextPage } from "next";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";

const ListButton = () => {
  const [isClicked, setIsClicked] = useState(true);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <Container>
      <ButtonWrapper>
        <Button>
          글쓰기&nbsp;
          <Image src="/img/write.png" alt="writing" width={32} height={32} />
        </Button>
        <ArticleButton>
          <span className={isClicked ? "" : "unactive"} onClick={handleClick}>
            전체글
          </span>
          <span className={isClicked ? "unactive" : ""} onClick={handleClick}>
            인기글
          </span>
        </ArticleButton>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div``;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 4px solid ${({ theme }) => theme.colors.blue}; ;
`;
const Button = styled.button`
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  border-radius: 26.5px;
  font-size: ${({ theme }) => theme.fonts.size.xl};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
`;
const ArticleButton = styled(Button)`
  padding: 10px 10px;
  background-color: ${({ theme }) => theme.colors.sky};
  span {
    padding: 3px 22px;
    border-radius: 26.5px;
    background-color: ${({ theme }) => theme.colors.blue};
    &.unactive {
      color: ${({ theme }) => theme.colors.lightgray};
      background-color: ${({ theme }) => theme.colors.sky};
    }
  }
`;

export default ListButton;
