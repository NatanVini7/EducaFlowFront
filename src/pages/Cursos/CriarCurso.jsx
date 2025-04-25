import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CriarCurso = () => {
    const baseUrl = "https://localhost:44338/api/curso";

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const [cursoSelecionado, setCursoSelecionado] = useState({
        idCurso: 0,
        codCurso: 0,
        tipoCurso: '',
        nomeCurso: '',
        siglaCurso: '',
        qtdEtapas: 0,
        niveisEnsino: ''
    });

    useEffect(() => {
        const carregarCursos = async () => {
            try {
                const response = await axios.get(baseUrl);
                setData(response.data);
            } catch (error) {
                console.error("Erro ao carregar cursos:", error);
            }
        };

        carregarCursos();
    }, []);  
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        setCursoSelecionado(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const requestPost = async () => {
        const cursoParaEnviar = {
            ...cursoSelecionado
        }

        delete cursoParaEnviar.idCurso;

        try {
            const response = await axios.post(baseUrl, cursoParaEnviar);
            setData([...data, response.data]);
            navigate(`/ver-curso/${response.data.idCurso}`);
        } catch (error) {
            console.error("Erro ao cadastrar curso:", error.response?.data);
        }
    };        

    return (
        <Container className="my-4">
            <h2 className="mb-4">Cadastro de Curso</h2>

            <Card className="mb-4">
                <Card.Header>Dados Do Curso</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome do Curso</Form.Label>
                                <Form.Control
                                    name="nomeCurso"
                                    value={cursoSelecionado.nomeCurso}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Sigla do Curso</Form.Label>
                                <Form.Control
                                    name="siglaCurso"
                                    value={cursoSelecionado.siglaCurso}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Código do Curso</Form.Label>
                                <Form.Control
                                    name="codCurso"
                                    value={cursoSelecionado.codCurso}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Ensino</Form.Label>
                                <Form.Control
                                    name="tipoEnsino"
                                    value={cursoSelecionado.tipoEnsino}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Quantidade de Etapas</Form.Label>
                                <Form.Control
                                    name="qtdEtapas"
                                    value={cursoSelecionado.qtdEtapas}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nível do Ensino</Form.Label>
                                <Form.Select name="niveisEnsino" value={cursoSelecionado.niveisEnsino} onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="Eja">Educação de Jovens e Adultos (EJA)</option>
                                    <option value="EducacaoProfissional">Educação Profisional e Técnologica</option>
                                    <option value="EnsinoEspecial">Ensino Especial</option>
                                    <option value="Ead">Ensino à Distância (EAD)</option>
                                    <option value="Noturno">Noturno</option>
                                    <option value="Presencial">Presencial</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" onClick={() => navigate("/buscar-cursos")}>Cancelar</Button>
                <Button variant="success" onClick={requestPost}>Salvar</Button>
            </div>

        </Container>
    );
};

export default CriarCurso;