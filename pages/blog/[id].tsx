import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import Axios from "axios";
import parse from "html-react-parser";
import Link from "next/link";

// Components
import DetailHeader from "./components/DetailHeader";
import DetailUserInfo from "./components/DetailUserInfo";

interface IData {
  data: {
    data: {
      id: number;
      createdAt: string;
      defaultThumbnail: {
        url: string;
      };
      title: string;
      creator: {
        nickName: string;
      };
    };
  };
}

const Home = ({ post }: IData) => {
  const item = post?.data.data;

  return (
    <Container>
      <DetailHeader />

      <Section>
        <DetailUserInfo data={post.data.data} />
        <Article>
          <Text>{item.title}</Text>
          <ImgWrapper>
            <Image
              src="/img/detail-banner.png"
              alt="detail-banner"
              width={666}
              height={357}
            />
          </ImgWrapper>
          <Text>{item.title}</Text>
        </Article>

        <ButtonWrapper>
          <Link href="/blog">
            <a>
              <Button>목록</Button>
            </a>
          </Link>
          <Button>URL복사</Button>
        </ButtonWrapper>
        <Image
          src="/img/detail-banner-sub.png"
          alt="detail-banner-sub"
          width={666}
          height={130}
        />

        <Comment>
          <CommentHeader>
            <span>댓글</span>
            <LikeAndComment>
              <Heart>
                <Image
                  src="/img/heart.png"
                  alt="Heart"
                  width={30}
                  height={30}
                />
                <span>0</span>
              </Heart>
              <More>
                <Image src="/img/dot.svg" alt="Heart" width={30} height={30} />
                <span>0</span>
              </More>
            </LikeAndComment>
          </CommentHeader>
          <CommentForm>
            <span>서제리</span>
            <span>abcdefghijklmnopqrstuvwxyz</span>
            <button>등록</button>
          </CommentForm>
          <CommentRecord>
            <Image src="/img/pen.png" alt="Heart" width={88} height={88} />
            <div>
              <span>댓글이 없습니다.</span>
              <span>첫 댓글을 작성해 보세요.</span>
            </div>
          </CommentRecord>
          <ArticleRecord>
            <PrevArticle>
              <div>
                <Image
                  src="/img/top-arrow.svg"
                  alt="top-arrow"
                  width={20}
                  height={15}
                />
                <span>이전글</span>
                <span>이전글로 이동해주세요.</span>
              </div>
              <span>2021.10.12</span>
            </PrevArticle>
            <hr />
            <PrevArticle>
              <div>
                <Image
                  src="/img/bottom-arrow.svg"
                  alt="bottom-arrow"
                  width={20}
                  height={15}
                />
                <span>이전글</span>
                <span>이전글로 이동해주세요.</span>
              </div>
              <span>2021.10.12</span>
            </PrevArticle>
          </ArticleRecord>
        </Comment>
      </Section>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://api.dev.coinghost.com/blogs");
  const posts = await res.json();
  const paths = posts?.data.data.map((post) => {
    return { params: { id: post.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    `https://api.dev.coinghost.com/blogs/${context.params.id}`
  );
  const post = await res.json();
  return {
    props: {
      post,
    },
  };
};

const Container = styled.div`
  max-width: 750px;
  margin: 0 auto;
`;

const Section = styled.div`
  padding: 0 42px;
`;

const Article = styled.div`
  margin: 26px 0;
`;
const Text = styled.span`
  font-size: 26px;
`;

const ImgWrapper = styled.div`
  margin: 25px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
`;
const Button = styled.button`
  padding: 15px 20px;
  border-radius: 15px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.blue};
  &:hover {
    background-color: ${(props) => props.theme.colors.skyblue};
    cursor: pointer;
  }
`;
const Heart = styled.div``;
const More = styled.div``;

const Comment = styled.div`
  margin-top: 30px;
`;
const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  span {
    font-size: 31px;
    font-weight: bold;
  }
`;

const LikeAndComment = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    margin-left: 30px;
    span {
      margin-left: 12px;
      font-size: 26px;
      color: ${(props) => props.theme.colors.blue};
    }
  }
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 21px;
  border: 1px solid black;
  span {
    width: 100%;
    text-align: left;
  }
  button {
    width: 100%;
    text-align: right;
  }
`;

const CommentRecord = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 120px 0;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
    span {
      margin-top: 12px;
      font-size: 26px;
      color: #d9e0e9;
    }
  }
`;

const ArticleRecord = styled.div``;
const PrevArticle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  span {
    margin-left: 21px;
  }
`;

export default Home;
