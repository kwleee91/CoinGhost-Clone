import styled from "styled-components";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";
import { useState, useEffect } from "react";
import useSWRInfinite from "swr/infinite";

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

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

function Home() {
  const { data, error } = useSWR<IData>(
    "https://api.dev.coinghost.com/blogs",
    fetcher
  );
  if (error) return "An error has occured";
  if (!data) return "Loading...";

  return (
    <Container>
      <Nav>
        <NavItem>
          <Image src="/img/bars.svg" alt="Hamburger" width={50} height={37} />
        </NavItem>
        <NavItem>
          <span>블로고</span>
        </NavItem>
        <NavItem>
          <Image src="/img/search.png" alt="Search" width={39} height={37} />
        </NavItem>
      </Nav>

      <Banner>
        <Image src="/img/banner.svg" alt="Banner" width={750} height={170} />
      </Banner>

      <List>
        <ListHeader>
          <WriteBtn>
            <span>글쓰기</span>
            <Image src="/img/write.png" alt="Write" width={32} height={32} />
          </WriteBtn>
          <ArticleArrangeBtn>
            <span>전체글</span>
            <span>인기글</span>
          </ArticleArrangeBtn>
        </ListHeader>

        <Article>
          {data?.data.data.map((item) => {
            return (
              <Link key={item.id} href={`/blog/${item.id}`}>
                <a>
                  <ArticleItem>
                    <ImgWrapper>
                      <img src={item.defaultThumbnail.url} alt={item.title} />
                    </ImgWrapper>
                    <ArticleInfo>
                      <ArticleTitle>
                        <span>{item.title}</span>
                      </ArticleTitle>
                      <ArticleDetail>
                        <User>
                          <span>{item.creator.nickName}</span>
                          <span>17분 전</span>
                        </User>
                        <LikeAndComment>
                          <div>
                            <Image
                              src="/img/heart.png"
                              alt="Heart"
                              width={30}
                              height={30}
                            />
                            <span>0</span>
                          </div>
                          <div>
                            <Image
                              src="/img/dot.svg"
                              alt="Heart"
                              width={30}
                              height={30}
                            />
                            <span>0</span>
                          </div>
                        </LikeAndComment>
                      </ArticleDetail>
                    </ArticleInfo>
                  </ArticleItem>
                </a>
              </Link>
            );
          })}
        </Article>
      </List>
    </Container>
  );
}

const Container = styled.div`
  max-width: 750px;
  margin: 0 auto;
`;
const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;
const NavItem = styled.div`
  span {
    font-size: 40px;
    font-weight: bold;
    color: ${(props) => props.theme.colors.blue};
  }
`;

const Banner = styled.div`
  margin-bottom: 22px;
`;

const List = styled.section``;
const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 4px solid ${(props) => props.theme.colors.blue};
`;
const WriteBtn = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 26.5px;
  font-size: 26px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.blue};
  span {
    margin: 6px 5px 0 0;
  }
`;

const ArticleArrangeBtn = styled.div`
  display: flex;
  span {
    padding: 10px 20px;
    border-radius: 26.5px;
    margin-left: 5px;
    font-size: 26px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.blue};
  }
`;

const Article = styled.ul``;

const ArticleItem = styled.li`
  display: flex;
  margin-top: 30px;
  padding-bottom: 23px;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightgray}; ;
`;

const ImgWrapper = styled.div`
  max-width: 131px;
  max-height: 102px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;

const ArticleInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 20px;
`;

const ArticleTitle = styled.div`
  margin-bottom: 8px;
  span {
    font-size: 26px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: left;
    color: ${(props) => props.theme.colors.black};
  }
`;

const ArticleDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;

const User = styled.div`
  span {
    font-size: 24px;
    letter-spacing: -0.6px;
    &:first-child {
      margin-right: 19px;
      color: ${(props) => props.theme.colors.blue};
    }
    &:last-child {
      color: ${(props) => props.theme.colors.lightgray};
    }
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

export default Home;
