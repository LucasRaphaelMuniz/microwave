import { Container, Buttons, Inputs } from './styles';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ButtonText } from '../../components/ButtonText'
import { Textarea } from '../../components/Textarea';
import { api } from '../../services/api'



export function NewProgramMicroWave() {
    const [name, setName] = useState('');
    const [food, setFood] = useState('');
    const [time, setTime] = useState('');
    const [power, setPower] = useState('');
    const [instruction, setInstruction] = useState('');
    const [caracter, setCaracter] = useState('');
    const navigate = useNavigate();

    async function handleAddPrograms() {
        try {
            await api.post("/programs", {
                name,
                food,
                time,
                power,
                instruction,
                caracter
            })
            alert("Programa de pré-aquecimento criado com sucesso!")
            navigate("/")
        } catch (error) {
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert("Não foi possivel cadastrar")
            }
        }
        
      }


    return (
        <Container>
            <div>
                <h1>Novo Programa Pré-Definido</h1>
                    <Inputs>
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label htmlFor="food">Alimento:</label>
                    <input
                        type="text"
                        id="food"
                        value={food}
                        onChange={(event) => setFood(event.target.value)}
                    />
                    <label htmlFor="time">Tempo (em minutos):</label>
                    <input
                        type="number"
                        id="time"
                        value={time}
                        onChange={(event) => setTime(event.target.value)}
                    />
                    <label htmlFor="power">Potência:</label>
                    <input
                        type="number"
                        id="power"
                        min="1"
                        max="10"
                        value={power}
                        onChange={(event) => setPower(event.target.value)}
                    />
                    
                    <label htmlFor="caracter">Caracter:</label>
                    <input
                        id="caracter"
                        type="text"
                        maxLength={1}
                        value={caracter}
                        onChange={(event) => setCaracter(event.target.value)}
                    />
                    
                    <label htmlFor="instruction">Instruções:</label>
                    <Textarea
                        id="instruction"
                        value={instruction}
                        onChange={(event) => setInstruction(event.target.value)}
                    />
                    </Inputs>
                    <Buttons>
                            <ButtonText title="Salvar" onClick={handleAddPrograms} />
                        <Link to="/">
                            <ButtonText title="Voltar" />
                        </Link>
                    </Buttons>
            </div>
        </Container>
    );
}