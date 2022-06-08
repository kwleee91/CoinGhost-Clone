import styled from "styled-components";
import Data from "../../public/data/sample.json";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

type Inputs = {
  allAgree: string;
  select1: string;
  select2: string;
  select3: string;
  select4: string;
};

function Register() {
  const { register, watch, setValue } = useForm<Inputs>();
  const [isAllChecked, setIsAllChecked] = useState(false);
  const router = useRouter();

  const allAgree = () => {
    if (watch("allAgree")) {
      for (let i = 0; i < 5; i++) {
        setValue(`select${i}`, true);
      }
    } else {
      for (let i = 0; i < 5; i++) {
        setValue(`select${i}`, false);
      }
    }
  };

  useEffect(() => {
    if (watch("select1") && watch("select2") && watch("select3")) {
      setIsAllChecked(true);
    } else {
      setValue("allAgree", false);
      setIsAllChecked(false);
    }
  }, [watch("select1"), watch("select2"), watch("select3"), watch("allAgree")]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/register/info");
  };

  return (
    <Container>
      <Header />
      <Form onSubmit={onSubmit}>
        <CheckBoxWrapper className="first" onChange={() => allAgree()}>
          <CheckBox
            id="allAgree"
            type="checkbox"
            {...register("allAgree")}
            checked={isAllChecked}
          />
          <Label htmlFor="allAgree">
            <span>
              코인고스트 이용약관, 개인정보 처리방침, 이벤트 및 정보 안내
              수신(선택)에 모두 동의합니다.
            </span>
            <span></span>
          </Label>
        </CheckBoxWrapper>
        {Data.map((item) => {
          return (
            <TermsCondition key={item.id}>
              <CheckBoxWrapper>
                <CheckBox
                  id={`${item.id}`}
                  type="checkbox"
                  {...register(`select${item.id}`, {
                    required: true,
                  })}
                />
                <Label htmlFor={`${item.id}`}>
                  <span>{item.text}</span>
                  <span>{item.select}</span>
                </Label>
              </CheckBoxWrapper>
              <TextWrapper>
                <TextArea defaultValue={item.content} />
              </TextWrapper>
            </TermsCondition>
          );
        })}
        <BtnWrapper>
          <Link href="/">
            <a>
              <Btn>취소</Btn>
            </a>
          </Link>
          <NextBtn disabled={isAllChecked === true ? false : true}>
            다음
          </NextBtn>
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
  justify-content: center;
  margin: 30px auto;
`;

const TermsCondition = styled.div``;

const CheckBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &.first {
    padding-bottom: 40px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.lightgray};
  }
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;

const Label = styled.label`
  display: inline-block;
  width: 100%;
  margin-left: 8px;
  font-size: 14px;
  font-weight: bold;
  & span:last-child {
    margin-left: 8px;
    color: ${({ theme }) => theme.colors.blue};
  }
`;

const TextWrapper = styled.div`
  margin-bottom: 15px;
`;
const TextArea = styled.textarea.attrs({
  cols: 80,
  rows: 5,
})`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  text-align: left;
  overflow-y: auto;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;
const Btn = styled.button.attrs({
  type: "submit",
})`
  padding: 20px 105px;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
`;

const NextBtn = styled(Btn)`
  color: ${(props) => props.theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  &:disabled {
    background-color: ${({ theme }) => theme.colors.sky};
    cursor: inherit;
  }
`;

export default Register;
