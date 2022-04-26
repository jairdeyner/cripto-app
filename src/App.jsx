import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

import ImageCripto from "./img/imagen-criptos.png";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const { criptomoneda, moneda } = monedas;
      setCargando(true);

      fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
      )
        .then((res) => res.json())
        .then((data) => {
          setResultado(data.DISPLAY[criptomoneda][moneda]);
          setCargando(false);
        });
    }
  }, [monedas]);

  return (
    <Container>
      <Image src={ImageCripto} alt="imagenes criptomonedas" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Formulario setMonedas={setMonedas} setResultado={setResultado} />

        {cargando ? (
          <Spinner />
        ) : (
          resultado.PRICE && <Resultado resultado={resultado} />
        )}
      </div>
    </Container>
  );
}

export default App;
