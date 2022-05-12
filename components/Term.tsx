import styled from "styled-components";

interface Props {
  content: string;
}

export default function Term({ content }: Props) {
  return (
    <Container>
      <TextWrapper>
        <Text>{content}</Text>
      </TextWrapper>
    </Container>
  );
}
const Container = styled.div``;

const TextWrapper = styled.div`
  margin-bottom: 15px;
`;
const Text = styled.textarea.attrs({
  cols: 300,
  rows: 5,
})`
  width: 100%;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  text-align: left;
  overflow-y: auto;
`;
