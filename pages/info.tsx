import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface FormInputs {
  phoneNumberErrorInput: number;
  confirmNumberErrorInput: number;
  pwErrorInput: number;
  pwConfirmErrorInput: number;
  nickNameErrorInput: string;
}

function Info() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

  const onSubmit = (data: FormInputs) => console.log(data);
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <CreateAccountWrapper>
        <AccountHeader>
          <Text>계정생성</Text>
          <Span>코인고스트는 개인 휴대전화 번호를 계정으로 사용합니다.</Span>
        </AccountHeader>
        <SelectWrapper>
          <Select>
            <Option>대한민국 +82</Option>
            <Option>미국 +82</Option>
            <Option>일본 +82</Option>
          </Select>
        </SelectWrapper>
        <PhoneNumberWrapper>
          <Input //
            type="number"
            placeholder="010-1234-5678"
            {...register("phoneNumberErrorInput", {
              required: "형식에 맞지 않는 번호입니다.",
              minLength: {
                value: 11,
                message: "This input must exceed 10 characters",
              },
            })}
          />
          <Button>인증번호 받기</Button>
        </PhoneNumberWrapper>

        <ErrorMessage
          errors={errors}
          name="phoneNumberErrorInput"
          render={({ messages }) => {
            console.log("messages", messages);
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              : null;
          }}
        />
        <ConfirmNumberWrapper>
          <Input //
            type="number"
            placeholder="인증번호"
            {...register("confirmNumberErrorInput", {
              required: "인증번호가 틀렸습니다. 다시 시도해 주세요.",
            })}
          />
          <Button>인증하기</Button>
        </ConfirmNumberWrapper>
      </CreateAccountWrapper>
      <ErrorMessage errors={errors} name="confirmNumberErrorInput" />

      <PwAndConfirmWrapper>
        <PwWrapper>
          <Text>패스워드</Text>
          <InputWrapper>
            <PwInput
              type="password"
              {...register("pwErrorInput", {
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
                  message:
                    "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
                },
                required: "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
                minLength: {
                  value: 8,
                  message: "8자 미만입니다.",
                },
                maxLength: {
                  value: 16,
                  message: "16자를 초과하셨습니다.",
                },
              })}
            />
          </InputWrapper>
        </PwWrapper>
        <ErrorMessage errors={errors} name="pwErrorInput" />
        <PwConfirmWrapper>
          <Text>패스워드 재확인</Text>
          <InputWrapper>
            <PwInput
              type="password"
              {...register("pwConfirmErrorInput", {
                required: "패스워드가 일치하지 않습니다.",
              })}
            />
          </InputWrapper>
        </PwConfirmWrapper>
        <ErrorMessage errors={errors} name="pwConfirmErrorInput" />
      </PwAndConfirmWrapper>

      <NickNameAndProfileWrapper>
        <NickNameWrapper>
          <Text>닉네임</Text>
          <InputWrapper>
            <Input
              type="text"
              {...register("nickNameErrorInput", {
                required: "이미 사용 중인 닉네임입니다.",
              })}
            />
            <Button>중복확인</Button>
          </InputWrapper>
        </NickNameWrapper>
        <ErrorMessage errors={errors} name="nickNameErrorInput" />
        <ProfileWrapper>
          <Text>프로필 사진(선택)</Text>
          <InputWrapper>
            <ProfileInput type="file" title="as " />
            <Button>사진변경</Button>
          </InputWrapper>
        </ProfileWrapper>
      </NickNameAndProfileWrapper>
      <CreateButton type="submit" value="가입하기" />
    </Container>
  );
}

const Container = styled.form`
  max-width: 490px;
  margin: 30px auto;
`;
const CreateAccountWrapper = styled.div``;
const AccountHeader = styled.div`
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
  background-color: ${(props) => props.theme.bgColors.unactive};
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
  background-color: ${(props) => props.theme.bgColors.unactive};
  border-radius: 5px;
`;

export default Info;
