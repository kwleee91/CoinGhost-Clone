import styled from "styled-components";
import { useForm } from "react-hook-form";

const Home = () => {
  const {
    register,
    setError,
    formState: { errors },
  } = useForm();

  return (
    <Container>
      <form>
        <input {...register("test")} />
        {errors.test && <p>{errors.test.message}</p>}

        <button
          type="button"
          onClick={() => {
            setError("test", { type: "focus" }, { shouldFocus: true });
          }}
        >
          Set Error Focus
        </button>
        <input type="submit" />
      </form>
    </Container>
  );
};

const Container = styled.div``;

export default Home;
