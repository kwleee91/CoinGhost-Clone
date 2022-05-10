import styled from "styled-components";
import { ReactNode } from "react";

interface Props {
  item: ReactNode;
}

export default function Term(props: Props) {
  console.log(props);
  return (
    <TermsDetail>
      <TermsDetailWrapper>
        <TermsDetailChkBox id={`detai${props.item.id}`} type="checkbox" />
        <Label htmlFor={`detai${props.item.id}`}>
          <Text>{props.item.text}</Text>
          <Select>{props.item.select}</Select>
        </Label>
      </TermsDetailWrapper>
      <TermsDetailTextWrapper>
        <TermsDetailText>{props.item.content}</TermsDetailText>
      </TermsDetailTextWrapper>
    </TermsDetail>
  );
}

const TermsDetail = styled.div`
  width: 100%;
  margin-top: 27px;
`;
const TermsDetailWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const TermsDetailChkBox = styled.input``;
const Label = styled.label`
  margin-left: 8px;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
`;
const Text = styled.span``;
const Select = styled.span`
  margin-left: 8px;
  color: ${(props) => props.theme.colors.blue};
`;

const TermsDetailTextWrapper = styled.div``;
const TermsDetailText = styled.textarea.attrs({
  cols: 15,
  rows: 5,
})`
  width: 100%;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  text-align: left;
  overflow-y: auto;
`;
