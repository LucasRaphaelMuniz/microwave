import { createContext, useContext, useState, useEffect } from 'react';
import { api } from "../services/api";


export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [data, setData] = useState({})
    async function signIn({email, password}){
        try {
            const response = await api.post("/sessions", {email, password});
            const {user, token} = response.data;

            localStorage.setItem("@microwave:user", JSON.stringify(user));
            localStorage.setItem("@microwavr:token", token);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({user, token})


        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possivel fazer login.")
                console.log(error)
            }
        }
    }

    useEffect(() => {
        const user = localStorage.getItem("@microwave:user")
        const token = localStorage.getItem("@microwave:token")

        if (token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        setData({
            token,
            user: JSON.parse(user)
        })

    }, [])

    return (
        <AuthContext.Provider value={{signIn, user: data.user}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    return context
}

export { AuthProvider, useAuth }