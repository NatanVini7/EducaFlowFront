import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  if (carregando) return <div className="container mt-4">Carregando dados...</div>;
  if (erro) return <div className="container mt-4 text-danger">{erro}</div>;

  return (
    <div className="container mt-4">
      <h2>Detalhes do Aluno</h2>
      <hr />
      <p><strong>Nome:</strong> {aluno.nomeAluno}</p>
      <p><strong>CPF:</strong> {aluno.cpf}</p>
      <p><strong>Data de Nascimento:</strong> {aluno.datadeNascimento}</p>
      <p><strong>Nome da Mãe:</strong> {aluno.nomeMae}</p>
      <p><strong>Nome do Pai:</strong> {aluno.nomePai}</p>
      <p><strong>RG:</strong> {aluno.rg}</p>
      <p><strong>Órgão Emissor:</strong> {aluno.orgaoEmissor} - {aluno.ufEmissor}</p>
      <p><strong>Emancipado:</strong> {aluno.emancipado ? 'Sim' : 'Não'}</p>
      <p><strong>Alfabetizado:</strong> {aluno.alfabetizado ? 'Sim' : 'Não'}</p>
      <p><strong>Deficiência:</strong> {aluno.deficiencia ? 'Sim' : 'Não'}</p>

      <h5 className="mt-4">Contato</h5>
      <p><strong>Telefone:</strong> {aluno.contato?.telefoneContato}</p>
      <p><strong>Email:</strong> {aluno.contato?.emailContato}</p>

      <h5 className="mt-4">Endereço</h5>
      <p><strong>Logradouro:</strong> {aluno.endereco?.logradouro}, {aluno.endereco?.numero}</p>
      <p><strong>Complemento:</strong> {aluno.endereco?.complemento}</p>
      <p><strong>Bairro:</strong> {aluno.endereco?.bairro}</p>
      <p><strong>Cidade:</strong> {aluno.endereco?.cidade?.nome || aluno.endereco?.cidade}</p>
      <p><strong>Estado:</strong> {aluno.endereco?.estado?.sigla || aluno.endereco?.estado}</p>
      <p><strong>CEP:</strong> {aluno.endereco?.cep}</p>

      <button className="btn btn-success" onClick={() => navigate(`/editar-aluno/${aluno.idAluno}`)}>Editar</button>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(`/buscar-alunos`)}>Voltar</button>
    </div>
  );
};

export default VerAluno;