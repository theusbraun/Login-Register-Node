import React from "react"
import Root from '../components/root'
import Sidebar from "../components/Bar/Sidebar"
import Escolas from "../components/escolas/escolas"
import './assets.css';


const App = () =>
  <div>
    <header class="cabecalho">
      <div className='hefesto'>
      <h1>HEFESTO</h1>
      <h2>Forjando as mentes do futuro</h2>
      </div>
      <div className='escolas'>
        <Escolas />
      </div>
    </header>
    <Root />
    <Sidebar />
  </div>

export default App;
