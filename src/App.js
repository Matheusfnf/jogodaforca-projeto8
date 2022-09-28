import "./reset.css";
import "./styles.css";
import "./palavras.js";
import imagemforcainicial from "./images/forca0.png";
import primeiraimagem from "./images/forca1.png";
import segundaimagem from "./images/forca2.png";
import terceiraimagem from "./images/forca3.png";
import quartaimagem from "./images/forca4.png";
import quintaimagem from "./images/forca5.png";
import sextaimagem from "./images/forca6.png";
import palavras from "../src/palavras.js";
import { useEffect, useState } from "react";
import React from "react";

const alphabet = {
  a: false,
  b: false,
  c: false,
  d: false,
  e: false,
  f: false,
  g: false,
  h: false,
  i: false,
  j: false,
  k: false,
  l: false,
  m: false,
  n: false,
  o: false,
  p: false,
  q: false,
  r: false,
  s: false,
  t: false,
  u: false,
  v: false,
  w: false,
  x: false,
  y: false,
  z: false,
};

function App() {
  const [word, setWord] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [palavraembaralhada, setPalavraEmbaralhada] = useState("");
  const [erros, setErros] = useState(0);
  const [imagem, setImagem] = useState(imagemforcainicial);
  const [perdeu, setPerdeu] = useState("");
  const [vitoria, setVitoria] = useState("");
  const [textochute, settextochute] = useState("");
  const [words, setWords] = useState(alphabet);
  useEffect(() => {
    if (erros == 6) {
      setImagem(sextaimagem);
      mensagemperdeu();
    }
    if (erros == 5) setImagem(quintaimagem);
    if (erros == 4) setImagem(quartaimagem);
    if (erros == 3) setImagem(terceiraimagem);
    if (erros == 2) setImagem(segundaimagem);
    if (erros == 1) setImagem(primeiraimagem);
    return;
  }, [erros]);

  function mensagemperdeu() {
    setAtivo(false);
    return setPerdeu(
      <div className="perdeu">
        Você <span>perdeu</span>, a palavra correta era:
        <span className="underline"> {palavraembaralhada}</span>
      </div>
    );
  }

  function resetgame() {
    setImagem(imagemforcainicial);
    setErros(0);
    setAtivo(true);
    setVitoria(false);
    setPerdeu(false);
    setWords(alphabet);
  }

  function mudouinput() {
    if (palavraembaralhada == textochute) {
      setVitoria(
        <div className="ganhou">
          <span>Parabéns</span>, a palavra correta era{" "}
          <span className="palavraganhou">{palavraembaralhada} </span>
        </div>
      );
      setAtivo(false);
      setWord(palavraembaralhada);
    } else {
      setImagem(sextaimagem);
      setAtivo(false);
      setWord(palavraembaralhada);
      setPerdeu(
        <div className="perdeu">
          Você <span>perdeu</span>, a palavra correta era {palavraembaralhada}{" "}
        </div>
      );
    }
  }

  function pegarvalor(e) {
    settextochute(e.target.value.toLowerCase());
  }

  function embaralhapalavra() {
    setAtivo(true);
    const palavraEscolhida =
      palavras[Math.floor(Math.random() * palavras.length)];
    const palavranormalizada = palavraEscolhida
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    console.log(palavranormalizada);

    setPalavraEmbaralhada(palavranormalizada);

    let palavratrocada = "";
    for (let i = 0; i < palavranormalizada.length; i++) {
      palavratrocada = palavratrocada + "-";
    }
    return setWord(palavratrocada);
  }

  const checaPalavra = (e) => {
    const palavraComTracos = [...word];
    if (palavraembaralhada.includes(e)) {
      for (let i = 0; i < palavraembaralhada.length; i++) {
        if (palavraembaralhada[i] === e) {
          palavraComTracos[i] = e;
          setWord(palavraComTracos.join(""));
        }
      }
    } else {
      const erroSomado = erros + 1;
      setErros(erroSomado);
    }
    if (!palavraComTracos.includes("-")) {
      setVitoria(
        <div className="ganhou">
          <span>Parabéns</span>, a palavra correta era{" "}
          <span className="palavraganhou">{palavraembaralhada} </span>
        </div>
      );
      setAtivo(false);
    }
  };

  return (
    <div className="App">
      <section className="estadoinicial">
        <div className="forcaeescolherpalavra">
          <img className="imginicial" src={imagem} alt="" />
          <div
            onClick={() => (resetgame(), embaralhapalavra())}
            className="escolherpalavra"
          >
            <p>Escolher Palavra</p>
          </div>
        </div>
        <div>
          {perdeu}
          {vitoria}
        </div>
        <p className="palavraunderline">{word}</p>
        <div className="letras-alfabeto">
          {!ativo
            ? Object.keys(words).map((e, index) => {
                return (
                  <button
                    disabled
                    className="letra"
                    onClick={() => {
                      setWords((prevState) => {
                        const state = { ...prevState };
                        state[e] = !state[e];
                        return { ...state };
                      });
                      checaPalavra(e);
                    }}
                    key={index}
                  >
                    {e.toUpperCase()}
                  </button>
                );
              })
            : Object.keys(words).map((e, index) => {
                return (
                  <button
                    disabled={words[e]}
                    className="letra"
                    style={{ color: words[e] ? "#000" : "#fff" }}
                    onClick={() => {
                      setWords((prevState) => {
                        const state = { ...prevState };
                        state[e] = !state[e];
                        return { ...state };
                      });
                      checaPalavra(e);
                    }}
                    key={index}
                  >
                    {e.toUpperCase()}
                  </button>
                );
              })}
        </div>
              
        <div className="OpcaoChutar">
          <div className="JaSeiAPalavra">Já sei a palavra!</div>
          <input disabled ={!ativo ? true : false}
            className="inputchute"
            type="text"
            name="input"
            onChange={(e) => {
              pegarvalor(e);
            }}
          />

          <button disabled ={!ativo ? true : false } onClick={mudouinput} className="Chutar">
            Chutar{" "}
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
