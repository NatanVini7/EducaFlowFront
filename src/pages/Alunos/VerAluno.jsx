import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VerAluno.css';

const VerAluno = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [aluno, setAluno] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    axios.get(`https://localhost:44338/api/aluno/${id}`)
      .then(response => {
        setAluno(response.data);
        setCarregando(false);
      })
      .catch(error => {
        console.error('Erro ao buscar aluno:', error);
        setErro('Erro ao carregar dados do aluno.');
        setCarregando(false);
      });
  }, [id]);

  const formatarData = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}-${mes}-${ano}`;
  };

  if (carregando) return <div className="container mt-4">Carregando dados...</div>;
  if (erro) return <div className="container mt-4 text-danger">{erro}</div>;

  return (
    <div className="ver-aluno-page py-4 px-3">
      <div className="container aluno-box bg-white rounded shadow p-4">
        <div className="row">

          <div className="col-md-3 border-end d-flex flex-column align-items-center text-center">
            <i className="bi bi-person-circle"></i>
            <p className="mt-3"><strong>Status:</strong> {aluno.status}</p>
          </div>

          <div className="col-md-9">
            <h4 className="fw-bold mb-4">DETALHES DO ALUNO</h4>
            <div className="row">
              <div className="col-md-6">
                <p><strong>Nome:</strong> {aluno.nomeAluno}</p>
                <p><strong>CPF:</strong> {aluno.cpf}</p>
                <p><strong>Sexo:</strong> {aluno.sexo}</p>
                <p><strong>Nome Social:</strong> {aluno.nomeSocial}</p>
                <p><strong>RG:</strong> {aluno.rg}</p>
                <p><strong>Órgão Emissor:</strong> {aluno.orgaoEmissor}/{aluno.ufEmissor}</p>
                <p><strong>Nome da Mãe:</strong> {aluno.nomeMae}</p>
                <p><strong>Nome do Pai:</strong> {aluno.nomePai}</p>
                <p><strong>Nº NIS (PIS/PASEP):</strong> {aluno.numeroNisPisPasep}</p>
                <p><strong>Emancipado?</strong> {aluno.emancipado ? "Sim" : "Não"}</p>
                <p><strong>Deficiência?</strong> {aluno.deficiencia ? "Sim" : "Não"}</p>
                {aluno.deficiencia && (
                  <p><strong>Qual?</strong> {aluno.deficienciaEspecificar}</p>
                )}
              </div>

              <div className="col-md-6">
                <p><strong>Data de Nascimento:</strong> {formatarData(aluno.datadeNascimento)}</p>
                <p><strong>Estado Civil:</strong> {aluno.estadoCivil}</p>
                <p><strong>Etnia:</strong> {aluno.etnia}</p>
                <p><strong>Data de Emissão:</strong> {formatarData(aluno.datadeEmissao)}</p>
                <p><strong>Nº do SUS:</strong> {aluno.numeroSus}</p>
                <p><strong>Alfabetizado?</strong> {aluno.alfabetizado ? "Sim" : "Não"}</p>
              </div>
              <hr />
              
              <div className="row">
                <div className="col-md-6">
                  <h5 className="fw-bold mt-3">TRANSPORTE</h5>
                  <p><strong>Utilizado:</strong> {aluno.transporte}</p>
                  <p><strong>Tipo:</strong> {aluno.tipoTransporte}</p>
                </div>

                <div className="col-md-6">
                  <h5 className="fw-bold mt-3">CONTATO</h5>
                  <p><strong>Telefone:</strong> {aluno.contato?.telefoneContato}</p>
                  <p><strong>Email:</strong> {aluno.contato?.emailContato}</p>
                </div>
              </div>
              <hr />

              <h5 className="fw-bold mt-3">ENDEREÇO</h5>
              <p><strong>Logradouro:</strong> {aluno.endereco?.logradouro}, {aluno.endereco?.numero}</p>
              <p><strong>Complemento:</strong> {aluno.endereco?.complemento}</p>
              <p><strong>Bairro:</strong> {aluno.endereco?.bairro}</p>
              <p><strong>Cidade:</strong> {aluno.endereco?.cidade?.nome || aluno.endereco?.cidade}</p>
              <p><strong>Estado:</strong> {aluno.endereco?.estado?.sigla || aluno.endereco?.estado}</p>
              <p><strong>CEP:</strong> {aluno.endereco?.cep}</p>

              <div className="mt-4 d-flex gap-3">
                <button className="btn btn-success" onClick={() => navigate(`/editar-aluno/${aluno.idAluno}`)}>Editar</button>
                <button className="btn btn-secondary" onClick={() => navigate(`/buscar-alunos`)}>Voltar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerAluno;