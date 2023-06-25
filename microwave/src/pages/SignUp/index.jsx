import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { ButtonText } from '../../components/ButtonText'

import { api } from "../../services/api"

import { Container } from './styles'

export function SignUp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSingUp() {
        if (!name || !email || !password) {
            return alert("Preencha todos os campos!");
        }

        api.post("/users", {name, email, password})
        .then(() => {
            alert("Usuario cadastrado com sucesso!");
            navigate("/");
        })
        .catch(error => {
            if (error.response) {
              alert(error.response.data.message);
            } else {
              alert('nao foi possivel cadastrar');
            }
        })
    }
    return(
        <Container>
                <h1>Micro ondas</h1>
                <h2>Crie sua conta</h2>

                <input 
                    placeholder="Nome"
                    type="text"

                    onChange={e => setName(e.target.value)}
                />

                <input 
                    placeholder="E-mail"
                    type="text"
                    onChange={e => setEmail(e.target.value)}

                />

                <input 
                    placeholder="Senha"
                    type="password"
                    onChange={e => setPassword(e.target.value)}

                />

                <ButtonText title="Cadastrar" onClick={handleSingUp}/>

                <Link to="/">
                    Voltar para login
                </Link>                

        </Container>
    )
}