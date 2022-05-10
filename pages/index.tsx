import styled from "styled-components";
import Term from "../components/Term";
import Link from "next/link";

function Home({ data }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <TermsConfirmAll>
          <InputChkBox id="agree" type="checkbox" />
          <TermsText htmlFor="agree">
            코인고스트 이용약관, 개인정보 처리방침, 이벤트 및 정보 안내
            수신(선택)에 모두 동의합니다.
          </TermsText>
        </TermsConfirmAll>
        {data.map((item) => {
          return <Term key={item.id} item={item} />;
        })}
        <BtnWrapper>
          <Link href="/signup">
            <a>
              <Btn>취소</Btn>
            </a>
          </Link>
          <NextBtn>다음</NextBtn>
        </BtnWrapper>
      </Form>
    </Container>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/data/sample.json");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const Container = styled.div``;

const Form = styled.form`
  max-width: 490px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 30px auto;
`;
const TermsConfirmAll = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.lightgray};
  padding-bottom: 40px;
  background-color: transparent;
`;

const InputChkBox = styled.input`
  width: 20px;
  height: 20px;
`;

const TermsText = styled.label`
  margin-left: 8px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
`;
const Btn = styled.button`
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  padding: 20px 100px;
  border-radius: 10px;
  font-weight: 600;
`;

const NextBtn = styled(Btn).attrs({
  type: "submit",
})`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.bgColors.blue};
`;

export default Home;
