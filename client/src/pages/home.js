import React, { useEffect, useState } from "react"
import './style.css';
import Axios from 'axios';
import { Link } from 'react-router-dom'
import Sidebar from "../components/Bar/Sidebar"

const Home = () => {

  const [loginReg, setLogin] = useState('')
  const [senhaReg, setSenha] = useState('')

  Axios.defaults.withCredentials = true

  const submitLogin = () => {
    Axios.post("http://localhost:3001/login", {
      login: loginReg,
      senha: senhaReg
    }).then((response) => {
      console.log(response);
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      console.log(response);
    })
  }, [])

  return (
    <div className="Formulario">
      <h1>Login</h1>
      <input type="text" name="nome" placeholder="Cpf ou email"
        onChange={(e) => {
          setLogin(e.target.value);
        }} />
      <input type="password" name="senha" placeholder="Senha"
        onChange={(e) => {
          setSenha(e.target.value)
        }} />
      <button onClick={submitLogin} href="#" class="Button">Login</button>
      <br />
      <Link to="/register">Registrar</Link>
    </div>

  );
}

export default Home