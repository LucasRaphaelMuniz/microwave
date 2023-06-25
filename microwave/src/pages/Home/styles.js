import styled from "styled-components";


export const Container = styled.div`

    text-align: center;

    width: 500px;
    height: 100vh;

    display: grid;
    grid-template-areas: 
        "timePower"
        "buttons"
        "predefinedGrid";
`;

export const TimePower = styled.div`
    display: grid;
    grid-area: 'timePower';
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    > input {
        border-radius: 10px;

    }    


`
export const Screen = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 20px;
`

export const Buttons = styled.div`
    grid-area: 'buttons';

    display: flex;
    justify-content: center;
    align-items: center;
    
`
export const PredefinedGrid = styled.div`
    grid-area: 'predefined';
    display: grid;
    grid-template-columns: repeat(3, 3fr);
    align-items: center;
    justify-content: center;
`
