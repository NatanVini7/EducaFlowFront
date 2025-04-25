import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const BuscarEscolas = () => {
    const baseUrl = "https://localhost:44338/api/escola"

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const [filtros, setFiltros] = useState({
      nome: ""
    });

    const requestGet = async () => {
        try {
          const response = await axios.get(baseUrl);
          setData(response.data);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        requestGet();
    }, []);

    const handleFiltroChange = (e) => {
      const { name, value } = e.target;
      setFiltros(prev => ({ ...prev, [name]: value }));
      setPaginaAtual(1);
    };

    const escolasFiltradas = data.filter((escola) => {
    
      return (
        escola.nomeEscola.toLowerCase().includes(filtros.nome.toLowerCase())
      );
    });

    const [paginaAtual, setPaginaAtual] = useState(1);
    const escolasPorPagina = 15;

    const indiceUltimaEscola = paginaAtual * escolasPorPagina;
    const indicePrimeiraEscola = indiceUltimaEscola - escolasPorPagina;
    const escolasPaginadas = escolasFiltradas.slice(indicePrimeiraEscola, indiceUltimaEscola);

    const totalPaginas = Math.ceil(escolasFiltradas.length / escolasPorPagina);

    return (
      <div className="container mt-5">
        <h3>Escola - Filtros</h3>

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

          <h3>Escola - Lista</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Código INEP</th>
                <th>Nome</th>
                <th>CNPJ</th>
              </tr>
            </thead>
            <tbody>
              {escolasPaginadas.length > 0 ? (
              escolasPaginadas.map(escola => (
                <tr key={escola.idEscola}>
                  <td>
                    <a href="#" onClick={() => navigate(`/ver-escola/${escola.idEscola}`)}>
                      {escola.numeroInep}
                    </a>
                  </td>
                  <td>
                    <a href="#" onClick={() => navigate(`/ver-escola/${escola.idEscola}`)}>
                      {escola.nomeEscola}
                    </a>
                  </td>
                  <td>
                    <a href="#" onClick={() => navigate(`/ver-escola/${escola.idEscola}`)}>
                      {escola.cnpj}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
            <tr>
              <td colSpan="5" className="text-center">Nenhuma Escola encontrada.</td>
            </tr>
          )}
          </tbody>
      </table>

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
        </div>
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-success" onClick={() => navigate("/criar-escola")}>
              Nova Escola
            </button>
        </div>
      </div>
    );
};

export default BuscarEscolas;