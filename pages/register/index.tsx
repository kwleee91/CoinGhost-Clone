import styled from "styled-components";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Data from "../../public/data/sample.json";

function Register() {
  const { register, watch, setValue } = useForm();
  const [isAllChecked, setIsAllChecked] = useState(false);

  const router = useRouter();

  const allSelect = () => {
    if (watch("allSelect")) {
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
      setValue("allSelect", false);
      setIsAllChecked(false);
    }
  }, [
    watch("select1"),
    watch("select2"),
    watch("select3"),
    watch("allSelect"),
  ]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/register/info");
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <CheckBoxWrapper className="first" onChange={() => allSelect()}>
          <CheckBox
            id="allAgree"
            type="checkbox"
            {...register("allSelect")}
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
            <ChkBoxAndText key={item.id}>
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
                <TextArea defaultValue={item.content}></TextArea>
              </TextWrapper>
            </ChkBoxAndText>
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
  justify-content: flex-start;
  margin: 30px auto;
`;

const ChkBoxAndText = styled.div``;

const CheckBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &.first {
    padding-bottom: 40px;
    border-bottom: 2px solid ${(props) => props.theme.colors.lightgray};
  }
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;

const Label = styled.label`
  margin-left: 8px;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  & span:last-child {
    margin-left: 8px;
    color: ${(props) => props.theme.colors.blue};
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
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  text-align: left;
  overflow-y: auto;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;
const Btn = styled.button`
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  padding: 20px 105px;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
`;

const NextBtn = styled(Btn).attrs({
  type: "submit",
})`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.btnColors.active};

  &:disabled {
    background-color: ${(props) => props.theme.btnColors.unactive};
    cursor: inherit;
  }
`;

export default Register;
