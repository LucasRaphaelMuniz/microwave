import styled from "styled-components";


export const Container = styled.div`
    width: 500px;
    height: 100vh;

    text-align: center;

    
    display: grid;
    grid-template-areas: 
        "inputs"
        "buttons";
`;

export const Inputs = styled.div`

    grid-area: 'inputs';
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    > input {
        border-radius: 10px;
        height: 20px;

    }    

    > button {
        background: none;
    }

`

export const Buttons = styled.div`
    grid-area: 'buttons';

    display: flex;
    justify-content: center;
    align-items: center;
    
`