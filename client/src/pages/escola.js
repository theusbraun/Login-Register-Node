import React, { useState } from "react";
import './style.css';
import Axios from 'axios';
import { Link } from 'react-router-dom'



const Escola = () => {

    const [nomeReg, setNomeReg] = useState('')

    const submitUser = () => {
        Axios.post("http://localhost:3001/criarEscola", {
          nome: nomeReg,
        })
      }

    return (

        <div className="Formulario">
      <h1>nova escola</h1>

      <div>
        <input type="text" name="nome" placeholder="Nome"
          onChange={(e) => {
            setNomeReg(e.target.value);
          }} />
        <button onClick={submitUser} href="#" class="Button">Salvar</button>
        <br />
      </div>
    </div>
    );
}

export default Escola