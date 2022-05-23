import styled from "styled-components";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface IForm {
  countryCode: string;
  phoneNumber: string;
  verifyCode: number;
  password: number;
  pwConfirm: number;
  nickName: string;
}

function Info() {
  const [isDisable, setIsDisable] = useState(true);
  const [pwVisible, setPwVisible] = useState(false);
  const [pwConfirmVisible, setPwConfirmVisible] = useState(false);
  const [verifyCode, setVerifyCode] = useState();
  const [authentication, setAuthentication] = useState();

  const router = useRouter();
  console.log(router);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    trigger,
  } = useForm<IForm>({
    criteriaMode: "all",
  });

  const onValid = (data: IForm) => {
    if (data.password !== data.pwConfirm) {
      setError(
        "pwConfirm",
        { message: "패스워드가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }
    router.push("/");
  };

  const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  const checkPhoneNum = (number: string) => regPhone.test(number);

  const getVerifyCode = async () => {
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
        .then((res) => {
          if (!res.ok) throw res;
          return res.json();
        })
        .then((data) => {
          setIsDisable(true);
          alert("인증번호를 보냈습니다.");
          setVerifyCode(data.data.message);
          trigger("phoneNumber");
        })
        .catch(async (err) => {
          const error = await err.json();
          alert(error?.data?.message);
          setError("phoneNumber", {
            type: "wrong number",
            message: "잘못된 번호입니다.",
          });
        });
    }
    return;
  };

  const getAuthentication = async () => {
    if (verifyCode === "333333") {
      if (watch("verifyCode")) {
        let auth: number = watch("verifyCode");
        fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth,
          }),
        })
          .then((res) => {
            if (!res.ok) throw new Error("잘못된 인증번호입니다.");
            return res.json();
          })
          .then((data) => {
            alert(`인증에 성공했습니다.`);
            setAuthentication(data.data.message);
            trigger("verifyCode");
          })
          .catch((err) => {
            alert(err.message);
            setError("verifyCode", {
              type: "wrong number",
              message: "잘못된 인증번호입니다.",
            });
          });
      }
    }
    return;
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
            <Button onClick={() => getAuthentication()}>인증하기</Button>
          </ConfirmNumberWrapper>
        </PhoneNumberConfirmWrapper>
        <p>{errors?.verifyCode?.message}</p>
        <p className="success">
          {verifyCode === "333333"
            ? `인증번호를 발송했습니다.
              이미 가입된 번호이거나, 가상전화번호는 인증번호를 받을 수 없습니다.`
            : ""}
        </p>
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
              <Button disabled={errors.nickName !== undefined ? true : false}>
                중복확인
              </Button>
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
  color: ${({ theme }) => theme.colors.black};
`;
const Span = styled.span`
  font-size: 10px;
  text-align: right;
  color: ${({ theme }) => theme.colors.darkgray};
`;
const SelectWrapper = styled.div`
  margin-bottom: 15px;
`;
const Select = styled.select`
  width: 490px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
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
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  margin-right: 10px;
  border-radius: 5px;
  padding: 0 10px;
`;
const Button = styled.button.attrs({ type: "button" })`
  width: 130px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: ${({ theme }) => theme.colors.sky};
    cursor: inherit;
  }
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
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
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
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  text-align: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${({ theme }) => theme.colors.sky};
  border-radius: 5px;
  &.active {
    background-color: ${({ theme }) => theme.colors.blue};
    cursor: pointer;
  }
`;

export default Info;
