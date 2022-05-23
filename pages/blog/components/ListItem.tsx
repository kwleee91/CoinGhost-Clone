import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const ListItem = ({
  id,
  title,
  creator,
  createdAt,
  defaultThumbnail,
  likes,
  comments,
}: DataProps) => {
  return (
    <Container>
      <Link href={`/blog/${id}`}>
        <Item>
          <ImgWrapper>
            <Image
              src={
                defaultThumbnail?.url
                  ? defaultThumbnail.url
                  : "/img/profile.jpg"
              }
              alt="profile"
              width={131}
              height={102}
            />
          </ImgWrapper>
          <ItemInfo>
            <ItemTitle>{title}</ItemTitle>
            <UserLikeWrapper>
              <User>
                <span>{creator?.nickName}</span>
                <span>17분 전</span>
              </User>
              <Like>
                <div>
                  <Image
                    src="/img/heart.png"
                    alt="heart"
                    width={30}
                    height={30}
                  />
                  <span>{likes}</span>
                </div>
                <div>
                  <Image
                    src="/img/dot.svg"
                    alt="profile"
                    width={30}
                    height={30}
                  />
                  <span>{comments}</span>
                </div>
              </Like>
            </UserLikeWrapper>
          </ItemInfo>
        </Item>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px 0;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
`;
const ImgWrapper = styled.div`
  margin-right: 19px;
`;
const ItemInfo = styled.div`
  display: inline-block;
  width: 100%;
`;

const ItemTitle = styled.h2`
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.normal};
`;

const UserLikeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.blue};
`;
const User = styled.div`
  span {
    font-size: ${({ theme }) => theme.fonts.size.lg};
    &:last-child {
      color: ${({ theme }) => theme.colors.darkgray};
      margin-left: 19px;
    }
  }
`;
const Like = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    &:first-child {
      margin-right: 30px;
    }
    span {
      margin-left: 12px;
      font-size: ${({ theme }) => theme.fonts.size.xl};
    }
  }
`;

export default ListItem;
