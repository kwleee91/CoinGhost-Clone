import styled from "styled-components";
import Image from "next/image";

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

const DetailUserInfo = ({ data }) => {
  const year = data.createdAt.slice(0, 4);
  const month = data.createdAt.slice(5, 7);
  const day = data.createdAt.slice(8, 10);
  const hour = data.createdAt.slice(11, 13);
  const minute = data.createdAt.slice(14, 16);
  const date = `${year}.${month}.${day} ${hour}:${minute}`;
  return (
    <>
      <User>
        <UserInfo>
          <ImgWrapper>
            <Image
              src="/img/profile.jpg"
              alt="profile"
              width={80}
              height={80}
            />
          </ImgWrapper>
          <NameAndDate>
            <UserName>
              <span>{data.creator.nickName}</span>
            </UserName>
            <Date>
              <span>{date}</span>
              <span>조회수 {data.id}</span>
            </Date>
          </NameAndDate>
        </UserInfo>
        <Image src="/img/bars.svg" alt="dot" width={34} height={34} />
      </User>
    </>
  );
};

const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 9px;
  padding-bottom: 24px;
  border-bottom: 0.5px solid ${(props) => props.theme.colors.blue};
  span {
    font-size: 30px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.black};
  }
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const NameAndDate = styled.div`
  margin-left: 22px;
`;
const UserName = styled.div`
  margin-bottom: 9px;
`;

const ImgWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
`;
const Date = styled.div`
  span {
    margin-right: 14px;
    font-size: 24px;
    color: ${(props) => props.theme.colors.lightgray};
  }
`;

export default DetailUserInfo;
