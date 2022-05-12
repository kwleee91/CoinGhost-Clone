import styled from "styled-components";
import Link from "next/link";
import Term from "../../components/Term";
import Data from "../../public/data/sample.json";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function Home() {
  const { register, handleSubmit, watch } = useForm();
  const router = useRouter();

  const onSubmit = () => {
    router.push("/register/info");
  };
  const selectAll = watch("selectAll");

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <AllCheckBoxWrapper>
          <CheckBox
            id="agree"
            type="checkbox"
            value="selectAll"
            {...register("selectAll")}
          />
          <Text htmlFor="agree">
            코인고스트 이용약관, 개인정보 처리방침, 이벤트 및 정보 안내
            수신(선택)에 모두 동의합니다.
          </Text>
        </AllCheckBoxWrapper>
        <CheckBoxWrapper>
          <CheckBox
            id="1"
            type="checkbox"
            value="1"
            checked={selectAll || null}
            {...register("select", {
              required: true,
            })}
          />
          <Label htmlFor="1">
            <CheckBoxText>코인고스트 이용약관 동의</CheckBoxText>
            <Select>(필수)</Select>
          </Label>
        </CheckBoxWrapper>
        <Term content={Data[0].content} />
        <CheckBoxWrapper>
          <CheckBox
            id="2"
            type="checkbox"
            value="2"
            checked={selectAll || null}
            {...register("select", {
              required: true,
            })}
          />
          <Label htmlFor="2">
            <CheckBoxText>월렛 이용약관 동의</CheckBoxText>
            <Select>(필수)</Select>
          </Label>
        </CheckBoxWrapper>
        <Term content={Data[1].content} />
        <CheckBoxWrapper>
          <CheckBox
            id="3"
            type="checkbox"
            value="3"
            checked={selectAll || null}
            {...register("select", {
              required: true,
            })}
          />
          <Label htmlFor="3">
            <CheckBoxText>개인정보 처리방침</CheckBoxText>
            <Select>(필수)</Select>
          </Label>
        </CheckBoxWrapper>
        <Term content={Data[2].content} />
        <CheckBoxWrapper>
          <CheckBox id="4" type="checkbox" checked={selectAll || null} />
          <Label htmlFor="4">
            <CheckBoxText>마케팅 정보 알림 동의</CheckBoxText>
            <Select>(선택)</Select>
          </Label>
        </CheckBoxWrapper>
        <Term content={Data[3].content} />
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

const Container = styled.div``;

const Form = styled.form`
  max-width: 490px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 30px auto;
`;
const AllCheckBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.lightgray};
  padding-bottom: 40px;
  margin-bottom: 20px;
  background-color: transparent;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;

const Text = styled.label`
  margin-left: 8px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
`;

const CheckBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-left: 8px;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
`;

const CheckBoxText = styled.span``;
const Select = styled.span`
  margin-left: 8px;
  color: ${(props) => props.theme.colors.blue};
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
  background-color: ${(props) => props.theme.btnColors.active};
  cursor: pointer;
  &:disabled {
    background-color: ${(props) => props.theme.btnColors.unactive};
    cursor: inherit;
  }
`;

export default Home;
