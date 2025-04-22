import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import BuscarAlunos from './pages/BuscarAlunos';
import CriarAluno from './pages/CriarAluno';
import SideTopbar from './components/SideTopbar';
import EditarAluno from './pages/EditarAluno';
import VerAluno from './pages/VerAluno';
import BuscarEscolas from './pages/BuscarEscolas';
import CriarEscola from './pages/CriarEscola';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route element={<SideTopbar />}>
            <Route path='/' element={<Home />} />
            <Route path='/buscar-alunos' element={<BuscarAlunos />} />
            <Route path='/buscar-escolas' element={<BuscarEscolas />} />
            <Route path='/criar-aluno' element={<CriarAluno />} />
            <Route path='/criar-escola' element={<CriarEscola/>} />
            <Route path='/editar-aluno/:id' element={<EditarAluno />} />
            <Route path='/ver-aluno/:id' element={<VerAluno />} />
          </ Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
