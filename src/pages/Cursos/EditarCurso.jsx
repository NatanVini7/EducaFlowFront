import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

const EditarCurso = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const baseUrl = `https://localhost:44338/api/curso/${id}`;
    const [modalExcluir, setModalExcluir] = useState(false);

    const [curso, setCurso] = useState({
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
                setCurso(response.data);
            } catch (error) {
                console.error("Erro ao carregar curso:", error);
            }
        };

        carregarCursos();
    }, [baseUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCurso(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const requestPut = async () => {
        try {
            await axios.put(baseUrl, curso);
            navigate(`/ver-curso/${id}`);
        } catch (error) {
            console.error("Erro ao atualizar curso:", error.response?.data);
        }
    };

    const requestDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/${curso.idCurso}`);
            abrirFecharModalExcluir();
            navigate("/buscar-curso");
        } catch (error) {
            console.error("Erro ao excluir curso:", error);
        }
    };

    const abrirFecharModalExcluir = () =>
        setModalExcluir(!modalExcluir);


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
                                    value={curso.nomeCurso}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Sigla do Curso</Form.Label>
                                <Form.Control
                                    name="siglaCurso"
                                    value={curso.siglaCurso}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Código do Curso</Form.Label>
                                <Form.Control
                                    name="codCurso"
                                    value={curso.codCurso}
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
                                    value={curso.tipoEnsino}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Quantidade de Etapas</Form.Label>
                                <Form.Control
                                    name="qtdEtapas"
                                    value={curso.qtdEtapas}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nível do Ensino</Form.Label>
                                <Form.Select name="niveisEnsino" value={curso.niveisEnsino} onChange={handleChange}>
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
                <Button className="btn btn-danger" onClick={abrirFecharModalExcluir}>Excluir</Button>
                <Button variant="success" onClick={requestPut}>Salvar Alterações</Button>
            </div>
            <Modal isOpen={modalExcluir}>
                <ModalBody>Confirma a exclusão do {curso.nomeCurso}?</ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={requestDelete}>Sim</button>
                    <button className="btn btn-secondary" onClick={abrirFecharModalExcluir}>Não</button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default EditarCurso;