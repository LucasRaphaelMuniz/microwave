import {  Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home'
import { NewProgramMicroWave } from '../pages/NewProgramMicroWave'

export function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/program" element={<NewProgramMicroWave />} />

        </Routes>
    )
}
