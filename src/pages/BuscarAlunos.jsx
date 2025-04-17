import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate  } from "react-router-dom";
import {  Modal, ModalBody, ModalFooter } from 'reactstrap';

const BuscarAlunos = () => {
  const baseUrl = "https://localhost:44338/api/aluno";

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [modalExcluir, setModalExcluir] = useState(false);

  const [alunoSelecionado, setAlunoSelecionado] = useState({
    idAluno: 0,
    nomeAluno: '',
    cpf: '',
    nomeSocial: '',
    orgaoEmissor: '',
    ufEmissor: '',
    rg: '',
    numeroNisPisPasep: '',
    numeroSus: '',
    nomeMae: '',
    nomePai: '',
    numeroInep: '',
    numeroRa: '',
    datadeNascimento: '',
    datadeEmissao: '',
    status: '',
    sexo: '',
    estadoCivil: '',
    etnia: '',
    transporte: '',
    tipoTransporte: '',
    alfabetizado: true,
    deficiencia: true,
    deficienciaEspecificar: '',
    emancipado: true,
    contato: {
      idContato: 0,
      telefoneContato: '',
      emailContato: ''
    },
    endereco: {
      idEndereco: 0,
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: ''
    },
    idContato: 0,
    idEndereco: 0 
  });

  const requestGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const requestDelete = async () => {
    await axios.delete(baseUrl + "/" + alunoSelecionado.idAluno)
      .then(response => {
        setData(data.filter(aluno => aluno.idAluno!== alunoSelecionado.idAluno));
        abrirFecharModalExcluir();
      }).catch(error=>{
        console.log(error);
      })
  }

  const abrirFecharModalExcluir = () =>
    setModalExcluir(!modalExcluir);

  const selecionarAluno = (aluno) => {
    setAlunoSelecionado(aluno);
      abrirFecharModalExcluir() 
  };

  useEffect(() => {
    requestGet();
  }, []);

  return (
    <div className="container mt-5">
      <br />
      <h2>Alunos</h2>
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
          {data.map(aluno => (
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
                  {aluno.datadeNascimento}
                </a>
              </td>
              <td>
                <a href="#" onClick={() => navigate(`/ver-aluno/${aluno.idAluno}`)}>
                  {aluno.nomeMae}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <header className="d-flex justify-content-center my-3">
        <button className="btn btn-success" onClick={() => navigate("/criar-aluno")}>
          Novo Aluno
        </button>
      </header>
      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão de {alunoSelecionado.nomeAluno}?
        </ModalBody>
        <ModalFooter>
        <button className='btn btn-danger' onClick={() => requestDelete()}>Sim</button>
        <button className='btn btn-secondary' onClick={() => abrirFecharModalExcluir()}>Não</button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default BuscarAlunos;