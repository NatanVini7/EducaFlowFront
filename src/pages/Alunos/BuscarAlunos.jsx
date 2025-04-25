import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './BuscarAlunos.css';

const BuscarAlunos = () => {
  const baseUrl = "https://localhost:44338/api/aluno";

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    nome: "",
    cpf: "",
    nomeMae: "",
    numeroInep: "",
    datadeNascimento: ""
  });

  const [paginaAtual, setPaginaAtual] = useState(1);
  const alunosPorPagina = 15;

  const requestGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatarData = (data) => {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}-${mes}-${ano}`;
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
    setPaginaAtual(1); // Resetar para a primeira página ao mudar filtro
  };

  const handleDataChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove tudo que não for número
  
    if (value.length > 8) value = value.slice(0, 8);
  
    let formatted = value;
    if (value.length >= 5) {
      formatted = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length >= 3) {
      formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
  
    setFiltros(prev => ({ ...prev, datadeNascimento: formatted }));
  };

  const handleCpfChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

    if (rawValue.length > 11) rawValue = rawValue.slice(0, 11);

    let formatted = rawValue;
    if (rawValue.length > 9) {
        formatted = `${rawValue.slice(0, 3)}.${rawValue.slice(3, 6)}.${rawValue.slice(6, 9)}-${rawValue.slice(9, 11)}`;
    } else if (rawValue.length > 6) {
        formatted = `${rawValue.slice(0, 3)}.${rawValue.slice(3, 6)}.${rawValue.slice(6)}`;
    } else if (rawValue.length > 3) {
        formatted = `${rawValue.slice(0, 3)}.${rawValue.slice(3)}`;
    }

    setFiltros(prev => ({ ...prev, cpf: formatted }));
  }

  const alunosFiltrados = data.filter((aluno) => {
    const dataFormatada = aluno.datadeNascimento
      ? formatarData(aluno.datadeNascimento)
      : "";
  
    const filtroDataFormatado = filtros.datadeNascimento.replace(/\//g, "-");
  
    return (
      aluno.nomeAluno.toLowerCase().includes(filtros.nome.toLowerCase()) &&
      aluno.cpf.includes(filtros.cpf) &&
      aluno.nomeMae.toLowerCase().includes(filtros.nomeMae.toLowerCase()) &&
      aluno.numeroInep.includes(filtros.numeroInep) &&
      dataFormatada.includes(filtroDataFormatado)
    );
  });
  

  const indiceUltimoAluno = paginaAtual * alunosPorPagina;
  const indicePrimeiroAluno = indiceUltimoAluno - alunosPorPagina;
  const alunosPaginados = alunosFiltrados.slice(indicePrimeiroAluno, indiceUltimoAluno);

  const totalPaginas = Math.ceil(alunosFiltrados.length / alunosPorPagina);

  useEffect(() => {
    requestGet();
  }, []);

  return (
    <div className="container mt-5">
      <h3>Alunos - Filtros</h3>

      <div className="row mb-4 g-3">
        <div className="col-md-4">
          <input
            type="text"
            name="nome"
            placeholder="Filtrar por nome"
            value={filtros.nome}
            onChange={handleFiltroChange}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="cpf"
            placeholder="Filtrar por CPF"
            value={filtros.cpf}
            onChange={handleCpfChange}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="nomeMae"
            placeholder="Filtrar por nome da mãe"
            value={filtros.nomeMae}
            onChange={handleFiltroChange}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="numeroInep"
            placeholder="Filtrar por código INEP"
            value={filtros.numeroInep}
            onChange={handleFiltroChange}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
        <input
            type="text"
            name="datadeNascimento"
            placeholder="Filtrar por data de nascimento dd/mm/aaaa"
            value={filtros.datadeNascimento}
            onChange={handleDataChange}
            className="form-control"
          />
        </div>
      </div>

      <h3>Alunos - Lista</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Código INEP</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Nome da mãe</th>
          </tr>
        </thead>
        <tbody>
          {alunosPaginados.length > 0 ? (
            alunosPaginados.map(aluno => (
              <tr key={aluno.idAluno}>
                <td>
                  <a href="#" onClick={() => navigate(`/ver-aluno/${aluno.idAluno}`)}>
                    {aluno.numeroInep}
                  </a>
                </td>
                <td>
                  <a href="#" onClick={() => navigate(`/ver-aluno/${aluno.idAluno}`)}>
                    {aluno.nomeAluno}
                  </a>
                </td>
                <td>
                  <a href="#" onClick={() => navigate(`/ver-aluno/${aluno.idAluno}`)}>
                    {aluno.cpf}
                  </a>
                </td>
                <td>
                  <a href="#" onClick={() => navigate(`/ver-aluno/${aluno.idAluno}`)}>
                    {formatarData(aluno.datadeNascimento)}
                  </a>
                </td>
                <td>
                  <a href="#" onClick={() => navigate(`/ver-aluno/${aluno.idAluno}`)}>
                    {aluno.nomeMae}
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">Nenhum aluno encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginação */}
      {totalPaginas > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className={`page-item ${paginaAtual === 1 && "disabled"}`}>
              <button className="page-link" onClick={() => setPaginaAtual(paginaAtual - 1)}>
                Anterior
              </button>
            </li>
            {[...Array(totalPaginas)].map((_, i) => (
              <li key={i} className={`page-item ${paginaAtual === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setPaginaAtual(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${paginaAtual === totalPaginas && "disabled"}`}>
              <button className="page-link" onClick={() => setPaginaAtual(paginaAtual + 1)}>
                Próxima
              </button>
            </li>
          </ul>
        </nav>
      )}

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-success" onClick={() => navigate("/criar-aluno")}>
          Novo Aluno
        </button>
      </div>
    </div>
  );
};

export default BuscarAlunos;
