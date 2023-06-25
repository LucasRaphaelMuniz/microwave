import { Container } from "./styles";

export function Predefined({ data, onClick, ...rest }){
    return (
      <Container type="Button" onClick={onClick} {...rest}>
        <h1>Nome: {data?.name}</h1>
        <h2>Alimento: {data?.food}</h2>
        <h2>Tempo (em minutos): {data?.time}</h2>
        <h2>Potência: {data?.power}</h2>
        <h2>String de aquecimento: {data?.caracter}</h2>
        <h2>Instruções: {data?.instruction}</h2>
      </Container>
    );
  }
  