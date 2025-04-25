import axios from 'axios';
import EnderecoForm from '../../components/EnderecoForm';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

const EditarEscola = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const baseUrl = `https://localhost:44338/api/escola/${id}`;
    const [modalExcluir, setModalExcluir] = useState(false);

    const [escola, setEscola] = useState({
        idEscola: 0,
        nomeEscola: '',
        nomeFantasia: '',
        numeroInep: '',
        cnpj: '',
        razaoSocial: '',
        site: '',
        tipoEscola: '',
        tipoEnsino: '',
        tipoVinculo: '',
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
        }
    });

    useEffect(() => {
        const carregarEscolas = async () => {
            try {
                const response = await axios.get(baseUrl);
                setEscola(response.data);
            } catch (error) {
                console.error("Erro ao carregar escolas:", error);
            }
        };

        carregarEscolas();
    }, [baseUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('endereco.')) {
            const field = name.split('.')[1];
            setEscola(prev => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    [field]: value
                }
            }));
        } else if (name.startsWith('contato.')) {
            const field = name.split('.')[1];
            setEscola(prev => ({
                ...prev,
                contato: {
                    ...prev.contato,
                    [field]: value
                }
            }));
        } else {
            setEscola(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const requestPut = async () => {
        try {
            await axios.put(baseUrl, escola);
            navigate(`/ver-escola/${id}`);
        } catch (error) {
            console.error("Erro ao atualizar escola:", error.response?.data);
        }
    };

    const requestDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/${escola.idEscola}`);
            abrirFecharModalExcluir();
            navigate("/buscar-escola");
        } catch (error) {
            console.error("Erro ao excluir escola:", error);
        }
    };

    const abrirFecharModalExcluir = () =>
        setModalExcluir(!modalExcluir);

    const handleCepChange = (e) => {
        let rawValue = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

        if (rawValue.length > 8) rawValue = rawValue.slice(0, 8);

        let formatted = rawValue;
        if (rawValue.length > 5) {
            formatted = `${rawValue.slice(0, 5)}-${rawValue.slice(5)}`;
        }

        setEscola(prev => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                cep: formatted
            }
        }));
    };

    return (
        <Container className="my-4">
            <h2 className="mb-4">Cadastro de Escola</h2>

            <Card className="mb-4">
                <Card.Header>Dados Da Escola</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome da Escola</Form.Label>
                                <Form.Control
                                    name="nomeEscola"
                                    value={escola.nomeEscola}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome Fantasia</Form.Label>
                                <Form.Control
                                    name="nomeFantasia"
                                    value={escola.nomeFantasia}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Número INEP</Form.Label>
                                <Form.Control
                                    name="numeroInep"
                                    value={escola.numeroInep}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Control
                                    name="cnpj"
                                    value={escola.cnpj}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Razão Social</Form.Label>
                                <Form.Control
                                    name="razaoSocial"
                                    value={escola.razaoSocial}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo da Escola</Form.Label>
                                <Form.Control
                                    name="tipoEscola"
                                    value={escola.tipoEscola}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Ensino</Form.Label>
                                <Form.Control
                                    name="tipoEnsino"
                                    value={escola.tipoEnsino}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Vinculo</Form.Label>
                                <Form.Control
                                    name="tipoVinculo"
                                    value={escola.tipoVinculo}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Header>Contato</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                name="contato.telefoneContato"
                                value={escola.contato.telefoneContato}
                                onChange={handleChange}
                                placeholder='(00)0000-0000'
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="contato.emailContato"
                                value={escola.contato.emailContato}
                                onChange={handleChange}
                                placeholder='seuemail@email.com'
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <EnderecoForm endereco={escola.endereco} onChange={handleChange} onCepChange={handleCepChange} />

            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" onClick={() => navigate("/buscar-escolas")}>Cancelar</Button>
                <Button className="btn btn-danger" onClick={abrirFecharModalExcluir}>Excluir</Button>
                <Button variant="success" onClick={requestPut}>Salvar Alterações</Button>
            </div>
            <Modal isOpen={modalExcluir}>
                <ModalBody>Confirma a exclusão de {escola.nomeEscola}?</ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={requestDelete}>Sim</button>
                    <button className="btn btn-secondary" onClick={abrirFecharModalExcluir}>Não</button>
                </ModalFooter>
            </Modal>

        </Container>
    );
};

export default EditarEscola;