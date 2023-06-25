
import { useState, useEffect } from 'react';
import { Container, TimePower, Buttons, PredefinedGrid, Screen } from './styles';
import { Link } from 'react-router-dom';
import { ButtonText } from '../../components/ButtonText';
import { Predefined } from '../../components/Predefined';
import { api } from '../../services/api'


export function Home() {
  const predefinedDataFixed = [
    {
      name: 'Pipoca (de micro-ondas)',
      food: 'Pipoca',
      time: 3,
      power: 7,
      caracter: '!',
      instruction: 'Observar o barulho de estouros do milho, caso houver um intervalo de mais de 10 segundos entre um estouro e outro, interrompa o aquecimento.'
    },
    {
      name: 'Leite',
      food: 'Leite',
      time: 5,
      power: 5,
      caracter: '@',
      instruction: 'Cuidado com aquecimento de líquidos, o choque térmico aliado ao movimento do recipiente pode causar fervura imediata causando risco de queimaduras.'
    },
    {
      name: 'Carne em pedaço ou fatias',
      food: 'Carne',
      time: '14',
      power: '4',
      caracter: '#',
      instruction: 'Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme.'
    },
    {
      name: 'Frango (qualquer corte)',
      food: 'Frango',
      time: '8',
      power: '7',
      caracter: '$',
      instruction: ' Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme.'
    },
    {
      name: 'Feijão congelado',
      food: 'Feijão',
      time: '8',
      power: '9',
      caracter: '%',
      instruction: 'Deixe o recipiente destampado e em casos de plástico, cuidado ao retirar o recipiente pois o mesmo pode perder resistência em altas temperaturas.'
    },
  ];
  const [time, setTime] = useState(0);
  const [power, setPower] = useState(10);
  const [output, setOutput] = useState('');
  const [isCounting, setIsCounting] = useState(false);
  const [stringTime, setStringTime] = useState('.')
  const [predefined, setPredefined] = useState(false)
  const [predefinedData, setPredefinedData] = useState([]);

  


  useEffect(() => {
    let countdownInterval;

    const calculateOutput = () => {
      let outputString = '';

      for (let i = 0; i < time; i++) {
        for (let j = 0; j < power; j++) {
          outputString += stringTime;
        }
        outputString += ' ';
      }

      setOutput(outputString.trim());
    };

    if (isCounting) {
      calculateOutput();

      countdownInterval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(countdownInterval);
            alert('Aquecimento concluído');
            setIsCounting(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [time, power, isCounting]);

  useEffect(() => {
    async function fetchPredefinedData() {
      const response = await api.get('/programs');
      setPredefinedData(response.data);
    }
  
    fetchPredefinedData();
  }, []);

  function handleStart() {
    let updatedTime = time;
    if (!predefined) {
      if (updatedTime === 0 || isCounting === true) {
        updatedTime += 30;
      } 
  
      if (updatedTime < 1 || updatedTime > 120) {
        alert('Tempo inválido. Insira um valor entre 1 e 120 segundos.');
        return;
      }
      
      if (power < 1 || power > 10) {
        alert('Potência inválida. O valor deve ser entre 1 e 10')
        return;
    }
      setTime(updatedTime);
      setIsCounting(true);
    } else {
      alert('Prato pré-definido em andamento, não é possivel adicionar tempo.')
    }
    
  }

  function handlePauseStop() {
    if (isCounting) {
      setIsCounting(false);
    } else {
      setTime(0);
      setPower(10);
      setOutput('');
    }
    setPredefined(false)
    setStringTime('.')


  }

  function handleTimeChange(e) {
    const enteredTime = parseInt(e.target.value);
    const convertedTime = enteredTime < 60 ? enteredTime : Math.floor(enteredTime / 60);
    setTime(convertedTime);

    
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  function handlePredefined(data, ...rest) {
    setTime(data.time * 60);
    setPower(data.power);
    setStringTime(data.caracter);
    setPredefined(true);
    setIsCounting(true);
  }
  
  

  return (
    <Container>
      <main>
        <h1>Micro-ondas</h1>
        <TimePower>
          <label htmlFor="time">Tempo (segundos):</label>
          <input 
            type="number" 
            id="time" 
            value={time} 
            onChange={handleTimeChange}
            disabled={predefined}
           />
          <label htmlFor="power">Potência:</label>
          <input
            placeholder="Nome"
            type="number"
            id="power"
            value={power}
            onChange={(e) => setPower(parseInt(e.target.value))}
            disabled={predefined}
          />
        </TimePower>
        <Screen>
          <h2>Tempo: {formatTime(time)}</h2>
          <h2>Potência: {power}</h2>
          <h2>String: {stringTime}</h2>
        </Screen>
          

        <Buttons>
          <ButtonText title="Início / +30s" onClick={handleStart}/>
          <ButtonText title="Pausa / Cancelar" onClick={handlePauseStop} />
        </Buttons>
        <div>
          <p>{output}</p>
        </div>
        <PredefinedGrid>    

              {predefinedDataFixed.map((data, index) => (
                <Predefined
                  key={index}
                  onClick={() => handlePredefined(data)}
                  data={data}
                />
              ))}      
            
            {predefinedData.map((data) => (
              <Predefined
                key={data.id}
                onClick={() => handlePredefined(data)}
                data={data}
                style={{ fontStyle: 'italic' }}
              />
            ))}     
            <Link to="/program">
              <ButtonText title="Novo Programa" />
            </Link>
        </PredefinedGrid>
      </main>
    </Container>
  );
}

