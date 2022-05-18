import styled from "styled-components";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface IForm {
  countryCode: string;
  phoneNumber: string;
  verifyCode: number;
  password: number;
  pwConfirm: number;
  nickName: string;
}

function Info() {
  const [pwVisible, setPwVisible] = useState(false);
  const [pwConfirmVisible, setPwConfirmVisible] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    criteriaMode: "all",
  });

  const onValid = (data: IForm, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== data.pwConfirm) {
      setError(
        "pwConfirm",
        { message: "패스워드가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }
  };

  const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  const checkPhoneNum = (number: string) => regPhone.test(number);

  const getVerifyCode = () => {
    if (checkPhoneNum(watch("phoneNumber"))) {
      let phone: string = watch("phoneNumber");
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

  const handlePwVisible = () => {
    setPwVisible(!pwVisible);
  };
  const handlePwConfirmVisible = () => {
    setPwConfirmVisible(!pwConfirmVisible);
  };
  return (
    <Container>
      <CreateAccount onSubmit={handleSubmit(onValid)}>
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
              {...register("phoneNumber", {
                required: "핸드폰 번호를 입력해주세요.",
                pattern: {
                  value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                  message: "핸드폰 번호를 입력해주세요.",
                },
              })}
            />
            <Button onClick={() => getVerifyCode()}>인증번호 받기</Button>
          </PhoneNumberWrapper>
          <p>{errors?.phoneNumber?.message}</p>
          <ConfirmNumberWrapper>
            <Input //
              type="number"
              placeholder="인증번호"
              {...register("verifyCode", {
                required: "인증번호가 틀렸습니다. 다시 시도해 주세요.",
              })}
            />
            <Button>인증하기</Button>
          </ConfirmNumberWrapper>
        </PhoneNumberConfirmWrapper>
        <p>{errors?.verifyCode?.message}</p>
        <Password>
          <PwWrapper>
            <Text>패스워드</Text>
            <PasswordInput
              type={pwVisible === false ? "password" : "text"}
              {...register("password", {
                required: "패스워드를 입력해주세요.",
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
                  message:
                    "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
                },
              })}
            />
            <ImgWrapper onClick={handlePwVisible}>
              <Image
                src={
                  pwVisible === true ? "/img/visible.png" : "/img/invisible.png"
                }
                alt="invisible"
                width={30}
                height={30}
              />
            </ImgWrapper>
          </PwWrapper>
          <p>{errors?.password?.message}</p>
          <PwConfirmWrapper>
            <Text>패스워드 재확인</Text>
            <PasswordInput
              type={pwConfirmVisible === false ? "password" : "text"}
              {...register("pwConfirm", {
                required: "패스워드를 다시 입력해주세요.",
              })}
            />
            <ImgWrapper onClick={handlePwConfirmVisible}>
              <Image
                src={
                  pwConfirmVisible === true
                    ? "/img/visible.png"
                    : "/img/invisible.png"
                }
                alt="visible"
                width={30}
                height={30}
              />
            </ImgWrapper>
          </PwConfirmWrapper>
          <p>{errors?.pwConfirm?.message}</p>
        </Password>
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
            <p>{errors?.nickName?.message}</p>
          </NickNameWrapper>
          <ProfileWrapper>
            <Text>프로필 사진(선택)</Text>
            <InputWrapper>
              <ProfileInput type="file" />
              <Button>사진변경</Button>
            </InputWrapper>
          </ProfileWrapper>
        </NickNameAndProfileWrapper>
        <CreateButton
          className={Object.keys(errors).length === 0 ? "active" : ""}
          type="submit"
          value="가입하기"
        />
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

const Password = styled.div`
  margin-bottom: 15px;
`;
const PwWrapper = styled.div`
  position: relative;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
  & ::-webkit-file-upload-button {
    display: none;
  }
  & ::-webkit-outer-spin-button,
  & ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const PasswordInput = styled.input`
  width: 490px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  border-radius: 5px;
  margin-top: 15px;
  padding-left: 10px;
`;

const ImgWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 15px;
`;
const PwConfirmWrapper = styled.div`
  position: relative;
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
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.btnColors.unactive};
  border-radius: 5px;
  &.active {
    background-color: ${(props) => props.theme.btnColors.active};
    cursor: pointer;
  }
`;

export default Info;
