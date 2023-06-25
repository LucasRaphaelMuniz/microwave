import { useState } from 'react';
import { ButtonText } from '../../components/ButtonText'
import { Container} from "./styles";
import { Link } from 'react-router-dom'


import { useAuth } from '../../hooks/auth';


export function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useAuth();

    function handleSignIn(){
        signIn({ email, password });
    }

    return(
        <Container>
            <h1>Micro Ondas</h1>
            <h2>Faça seu login</h2>

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

            <ButtonText title="Entrar" onClick={handleSignIn}/>
            <Link to="/register">
                    Criar conta                
            </Link>

        </Container>
    )
}