import { Container } from "./styles";

export function ButtonText({ title, onClick}){
    return (
        <Container 
            type="button"
            onClick={onClick}
        >
            {title}
        </Container>
    );
}