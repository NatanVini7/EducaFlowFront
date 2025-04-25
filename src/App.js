import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import BuscarAlunos from './pages/Alunos/BuscarAlunos';
import CriarAluno from './pages/Alunos/CriarAluno';
import SideTopbar from './components/SideTopbar';
import EditarAluno from './pages/Alunos/EditarAluno';
import VerAluno from './pages/Alunos/VerAluno';
import BuscarEscolas from './pages/Escola/BuscarEscolas';
import CriarEscola from './pages/Escola/CriarEscola';
import VerEscola from './pages/Escola/VerEscola';
import EditarEscola from './pages/Escola/EditarEscola';
import BuscarCursos from './pages/Cursos/BuscarCursos';
import CriarCurso from './pages/Cursos/CriarCurso';
import VerCurso from './pages/Cursos/VerCurso';
import EditarCurso from './pages/Cursos/EditarCurso';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route element={<SideTopbar />}>
            <Route path='/' element={<Home />} />
            <Route path='/buscar-alunos' element={<BuscarAlunos />} />
            <Route path='/buscar-escolas' element={<BuscarEscolas />} />
            <Route path='/buscar-cursos' element={<BuscarCursos />} />
            <Route path='/criar-aluno' element={<CriarAluno />} />
            <Route path='/criar-escola' element={<CriarEscola/>} />
            <Route path='/criar-curso' element={<CriarCurso/>} />
            <Route path='/editar-aluno/:id' element={<EditarAluno />} />
            <Route path='/editar-escola/:id' element={<EditarEscola />} />
            <Route path='/editar-curso/:id' element={<EditarCurso />} />
            <Route path='/ver-aluno/:id' element={<VerAluno />} />
            <Route path='/ver-escola/:id' element={<VerEscola />} />
            <Route path='/ver-curso/:id' element={<VerCurso />} />
          </ Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
