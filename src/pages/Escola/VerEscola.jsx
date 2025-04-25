import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const VerEscola = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [escola, setEscola] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
      axios.get(`https://localhost:44338/api/escola/${id}`)
        .then(response => {
          setEscola(response.data);
          setCarregando(false);
        })
        .catch(error => {
          console.error('Erro ao buscar escola:', error);
          setErro('Erro ao carregar dados da escola.');
          setCarregando(false);
        });
    }, [id]);

    if (carregando) return <div className="container mt-4">Carregando dados...</div>;
    if (erro) return <div className="container mt-4 text-danger">{erro}</div>;
    
    return (
        <div className="ver-escola-page py-4 px-3">
        <div className="container escola-box bg-white rounded shadow p-4">
            <div className="row">

            <div className="col-md-3 border-end d-flex flex-column align-items-center text-center">
            <i className="bi bi-person-circle"></i>
            </div>

            <div className="col-md-9">
                <h4 className="fw-bold mb-4">DETALHES DA ESCOLA</h4>
                <div className="row">
                <div className="col-md-7">
                    <p><strong>Nome:</strong> {escola.nomeEscola}</p>
                    <p><strong>Nome Fantasia:</strong> {escola.nomeFantasia}</p>
                    <p><strong>CNPJ:</strong> {escola.cnpj}</p>
                    <p><strong>Número do INEP:</strong> {escola.numeroInep}</p>
                    <p><strong>Razão Social:</strong> {escola.razaoSocial}</p>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                    <h5 className="fw-bold mt-3">CONTATO</h5>
                    <p><strong>Telefone:</strong> {escola.contato?.telefoneContato}</p>
                    <p><strong>Email:</strong> {escola.contato?.emailContato}</p>
                    </div>
                </div>
                <hr />

                <h5 className="fw-bold mt-3">ENDEREÇO</h5>
                <p><strong>Logradouro:</strong> {escola.endereco?.logradouro}, {escola.endereco?.numero}</p>
                <p><strong>Complemento:</strong> {escola.endereco?.complemento}</p>
                <p><strong>Bairro:</strong> {escola.endereco?.bairro}</p>
                <p><strong>Cidade:</strong> {escola.endereco?.cidade?.nome || escola.endereco?.cidade}</p>
                <p><strong>Estado:</strong> {escola.endereco?.estado?.sigla || escola.endereco?.estado}</p>
                <p><strong>CEP:</strong> {escola.endereco?.cep}</p>

                <div className="mt-4 d-flex gap-3">
                    <button className="btn btn-success" onClick={() => navigate(`/editar-escola/${escola.idEscola}`)}>Editar</button>
                    <button className="btn btn-secondary" onClick={() => navigate(`/buscar-escolas`)}>Voltar</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default VerEscola;