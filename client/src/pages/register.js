import React, { useState } from "react";
import './style.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';


const Register = () => {
  const [nomeReg, setNomeReg] = useState('')
  const [dateReg, setDateReg] = useState('')
  const [cpfReg, setCpfReg] = useState('')
  const [emailReg, setEmailReg] = useState('')
  const [senhaReg, setSenhaReg] = useState('')

  const submitUser = () => {
    Axios.post("http://localhost:3001/register", {
      nome: nomeReg,
      data_nascimento: dateReg,
      cpf: cpfReg,
      email: emailReg,
      senha: senhaReg
    }).then((response) => {
      console.log(response);
    })
  }

  return (
    <div className="Formulario">
      <h1>usuario</h1>

      <div>
        <input type="text" name="nome" placeholder="Nome"
          onChange={(e) => {
            setNomeReg(e.target.value);
          }} />
        <input type="date" name="data_nascimento" placeholder="Data Nascimento"
          onChange={(e) => {
            setDateReg(e.target.value)
          }} />
        <input type="text" name="cpf" placeholder="CPF" maxLength='11'
          onChange={(e) => {
            setCpfReg(e.target.value)
          }} />
        <input type="email" name="email" placeholder="Email"
          onChange={(e) => {
            setEmailReg(e.target.value)
          }} />
        <input type="password" name="senha" placeholder="Senha"
          onChange={(e) => {
            setSenhaReg(e.target.value)
          }} />
        <button onClick={submitUser} href="#" class="Button">Salvar</button>
        <br />
        <Link to='/'>Login</Link>
      </div>
    </div>

  );

}


export default Register;