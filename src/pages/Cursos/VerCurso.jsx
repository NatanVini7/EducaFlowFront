import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const VerCurso = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [curso, setCurso] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:44338/api/curso/${id}`)
            .then(response => {
                setCurso(response.data);
                setCarregando(false);
            })
            .catch(error => {
                console.error('Erro ao buscar curso:', error);
                setErro('Erro ao carregar dados da curso.');
                setCarregando(false);
            });
    }, [id]);

    if (carregando) return <div className="container mt-4">Carregando dados...</div>;
    if (erro) return <div className="container mt-4 text-danger">{erro}</div>;

    return (
        <div className="ver-curso-page py-4 px-3">
            <div className="container curso-box bg-white rounded shadow p-4">
                <div className="row">
                    <div className="col-md-9">
                        <h4 className="fw-bold mb-4">DETALHES DO CURSO</h4>
                        <div className="row">
                            <div className="col-md-7">
                                <p><strong>Curso:</strong> {curso.nomeCurso}</p>
                                <p><strong>Código do Curso:</strong> {curso.codCurso}</p>
                                <p><strong>Tipo de Ensino:</strong> {curso.tipoEnsino}</p>
                                <p><strong>Quantidade de Etapas:</strong> {curso.qtdEtapas}</p>
                                <p><strong>Nível de Ensino:</strong> {curso.niveisEnsino}</p>
                            </div>
                            <div className="mt-4 d-flex gap-3">
                                <button className="btn btn-success" onClick={() => navigate(`/editar-curso/${curso.idCurso}`)}>Editar</button>
                                <button className="btn btn-secondary" onClick={() => navigate(`/buscar-cursos`)}>Voltar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerCurso;