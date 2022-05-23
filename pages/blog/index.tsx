import type { NextPage } from "next";
import styled from "styled-components";
import React, { useState } from "react";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";

// Components
import ListNav from "./components/ListNav";
import ListButton from "./components/ListButton";
import ListItem from "./components/ListItem";

export interface DataProps {
  id: number;
  title: string;
  creator: { nickName: string };
  createdAt: string;
  defaultThumbnail?: { url: string };
  likes?: number;
  comments?: number;
}

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  const [page, setPage] = useState<number>(0);

  const getKey = (
    pageIndex: number,
    previousPageData: { data: { data: object } }
  ) => {
    if (previousPageData && !previousPageData.data) return null;
    if (page === 0)
      return `https://api.dev.coinghost.com/blogs?page=${
        pageIndex + 1
      }&limit=10`;
    if (page === 1)
      return `https://api.dev.coinghost.com/blogs?orderBy=likes&page=${
        pageIndex + 1
      }&limit=10`;
  };

  const { data, setSize, size, error } = useSWRInfinite(getKey, fetcher);

  const { ref } = useInView({
    onChange: () => {
      if (
        !error &&
        data &&
        data[data.length - 1].data?.meta.page ===
          data[data.length - 1].data?.meta.totalPage
      ) {
        return;
      }
      console.log("size", size);
      setSize(size + 1);
    },
    threshold: 1,
    rootMargin: "200px 0px 0px 0px",
  });

  const Dataprint = data && data.map((el) => el.data).map((el) => el.data);

  return (
    <Container>
      <ListNav />
      <Banner>
        <Image src="/img/banner.svg" alt="Banner" width={750} height={170} />
      </Banner>
      <ListButton />

      {!Dataprint
        ? ""
        : Dataprint.flat().map((el) => {
            return (
              <ListItem
                id={el.id}
                key={el.id}
                title={el.title}
                creator={el.creator}
                createdAt={el.createdAt}
                defaultThumbnail={el.defaultThumbnail}
                likes={el.likes}
                comments={el.comments}
              />
            );
          })}
      <div ref={ref}></div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 750px;
  margin: 0 auto;
`;

const Banner = styled.div`
  margin-bottom: 20px;
`;

export default Home;
