import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormInputs {
  countryCode: string;
  phoneNumber: string;
  verifyCode: number;
  pwInput: number;
  pwConfirm: number;
  nickName: string;
}

function Info() {
  const [verifyCode, setVerifyCode] = useState([]);
  console.log(verifyCode);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

  const onSubmit = (data: FormInputs) => console.log("");

  const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  const checkPhoneNum = (number: string) => regPhone.test(number);

  const getVerifyCode = () => {
    if (checkPhoneNum(watch("phoneNumber"))) {
      let phone: string =
        watch("countryCode").slice(-2) + "-" + watch("phoneNumber").slice(1);
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
        }),
      })
        .then((res) => res.json())
        .then((data) => setVerifyCode(data));
    }
  };

  const confirmVerifyCode = (code: string) => {
    if (verifyCode === "333333") {
      return alert("맞음");
    } else {
      return alert("틀림");
    }
  };

  return (
    <Container>
      <CreateAccount onSubmit={handleSubmit(onSubmit)}>
        <PhoneNumberConfirmWrapper>
          <Header>
            <Text>계정생성</Text>
            <Span>코인고스트는 개인 휴대전화 번호를 계정으로 사용합니다.</Span>
          </Header>
          <SelectWrapper>
            <Select
              {...register("countryCode")}
              onChange={(e) => console.log(e.currentTarget.value)}
            >
              <Option value="+82">대한민국 +82</Option>
              <Option value="+82">대한민국 +82</Option>
              <Option value="+82">대한민국 +82</Option>
            </Select>
          </SelectWrapper>
          <PhoneNumberWrapper>
            <Input //
              type="text"
              placeholder="010-1234-5678"
              {...register("phoneNumber", { required: true })}
            />
            <Button onClick={() => getVerifyCode()}>인증번호 받기</Button>
          </PhoneNumberWrapper>
          {errors.phoneNumber && <p>abcdefghijklmnopqrstuvwxyz</p>}

          <ConfirmNumberWrapper>
            <Input //
              type="text"
              placeholder="인증번호"
              {...register("verifyCode", {
                required: "인증번호가 틀렸습니다. 다시 시도해 주세요.",
              })}
            />
            <Button onClick={() => confirmVerifyCode()}>인증하기</Button>
          </ConfirmNumberWrapper>
        </PhoneNumberConfirmWrapper>
        {errors.verifyCode && <p>abcdefghijklmnopqrstuvwxyz</p>}

        <PwAndConfirmWrapper>
          <PwWrapper>
            <Text>패스워드</Text>
            <InputWrapper>
              <PwInput
                type="password"
                placeholder="010-1234-5678"
                {...register("pwInput", { required: true })}
              />
              />
            </InputWrapper>
          </PwWrapper>
          {errors.pwInput && <p>098765432</p>}
          <PwConfirmWrapper>
            <Text>패스워드 재확인</Text>
            <InputWrapper>
              <PwInput
                type="password"
                {...register("pwConfirm", {
                  required: "패스워드가 일치하지 않습니다.",
                })}
              />
            </InputWrapper>
          </PwConfirmWrapper>
          {errors.pwConfirm && <p>zyxwvsdf</p>}
        </PwAndConfirmWrapper>

        <NickNameAndProfileWrapper>
          <NickNameWrapper>
            <Text>닉네임</Text>
            <InputWrapper>
              <Input
                type="text"
                {...register("nickName", {
                  required: "이미 사용 중인 닉네임입니다.",
                })}
              />
              <Button>중복확인</Button>
            </InputWrapper>
            {errors.nickName && <p>123456789</p>}
          </NickNameWrapper>
          
          <ProfileWrapper>
            <Text>프로필 사진(선택)</Text>
            <InputWrapper>
              <ProfileInput type="file" title="as " />
              <Button>사진변경</Button>
            </InputWrapper>
          </ProfileWrapper>
        </NickNameAndProfileWrapper>
        <CreateButton type="submit" value="가입하기" />
      </CreateAccount>
    </Container>
  );
}

const Container = styled.div``;
const CreateAccount = styled.form`
  max-width: 490px;
  margin: 30px auto;
`;
const PhoneNumberConfirmWrapper = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
const Text = styled.span`
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  color: ${(props) => props.theme.colors.black};
`;
const Span = styled.span`
  font-size: 10px;
  text-align: right;
  color: ${(props) => props.theme.colors.darkgray};
`;
const SelectWrapper = styled.div`
  margin-bottom: 15px;
`;
const Select = styled.select`
  width: 490px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  border-radius: 5px;
  padding: 0 10px;
`;
const Option = styled.option``;
const PhoneNumberWrapper = styled.div`
  margin-bottom: 15px;
  & ::-webkit-outer-spin-button,
  & ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const Input = styled.input`
  width: 350px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  margin-right: 10px;
  border-radius: 5px;
  padding: 0 10px;
`;
const Button = styled.button`
  width: 130px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  text-align: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.btnColors.unactive};
  border-radius: 5px;
`;
const ConfirmNumberWrapper = styled.div`
  margin-bottom: 15px;
  & ::-webkit-outer-spin-button,
  & ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const PwAndConfirmWrapper = styled.div`
  margin-bottom: 15px;
`;
const PwWrapper = styled.div``;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  & ::-webkit-file-upload-button {
    display: none;
  }
  & ::-webkit-outer-spin-button,
  & ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const PwInput = styled.input`
  width: 490px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  border-radius: 5px;
`;
const PwConfirmWrapper = styled.div`
  margin-top: 15px;
`;

const NickNameAndProfileWrapper = styled.div``;
const NickNameWrapper = styled.div`
  margin-bottom: 15px;
`;
const ProfileWrapper = styled.div`
  margin-bottom: 15px;
`;

const ProfileInput = styled(Input)`
  color: transparent;
`;
const CreateButton = styled.input`
  width: 490px;
  height: 50px;
  margin-top: 55px;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  text-align: center;
  color: ${(props) => props.theme.colors.darkgray};
  background-color: ${(props) => props.theme.btnColors.unactive};
  border-radius: 5px;
`;

export default Info;
