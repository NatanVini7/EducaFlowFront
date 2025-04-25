import axios from 'axios';
import EnderecoForm from '../../components/EnderecoForm';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CriarEscola = () => {
    const baseUrl = "https://localhost:44338/api/escola";
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const [escolaSelecionada, setEscolaSelecionada] = useState({
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
                setData(response.data);
            } catch (error) {
                console.error("Erro ao carregar escolas:", error);
            }
        };

        carregarEscolas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('endereco.')) {
            const field = name.split('.')[1];
            setEscolaSelecionada(prev => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    [field]: value
                }
            }));
        } else if (name.startsWith('contato.')) {
            const field = name.split('.')[1];
            setEscolaSelecionada(prev => ({
                ...prev,
                contato: {
                    ...prev.contato,
                    [field]: value
                }
            }));
        } else {
            setEscolaSelecionada(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleCepChange = (e) => {
        let rawValue = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

        if (rawValue.length > 8) rawValue = rawValue.slice(0, 8);

        let formatted = rawValue;
        if (rawValue.length > 5) {
            formatted = `${rawValue.slice(0, 5)}-${rawValue.slice(5)}`;
        }

        setEscolaSelecionada(prev => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                cep: formatted
            }
        }));
    };

    const requestPost = async () => {
        const escolaParaEnviar = {
            ...escolaSelecionada,
            endereco: { ...escolaSelecionada.endereco },
            contato: { ...escolaSelecionada.contato }
        };

        delete escolaParaEnviar.idEscola;

        try {
            const response = await axios.post(baseUrl, escolaParaEnviar);
            setData([...data, response.data]);
            navigate(`/ver-escola/${response.data.idEscola}`);
        } catch (error) {
            console.error("Erro ao cadastrar escola:", error.response?.data);
        }
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
                                    value={escolaSelecionada.nomeEscola}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome Fantasia</Form.Label>
                                <Form.Control
                                    name="nomeFantasia"
                                    value={escolaSelecionada.nomeFantasia}
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
                                    value={escolaSelecionada.numeroInep}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Control
                                    name="cnpj"
                                    value={escolaSelecionada.cnpj}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Razão Social</Form.Label>
                                <Form.Control
                                    name="razaoSocial"
                                    value={escolaSelecionada.razaoSocial}
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
                                    value={escolaSelecionada.tipoEscola}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Ensino</Form.Label>
                                <Form.Control
                                    name="tipoEnsino"
                                    value={escolaSelecionada.tipoEnsino}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Vinculo</Form.Label>
                                <Form.Control
                                    name="tipoVinculo"
                                    value={escolaSelecionada.tipoVinculo}
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
                                value={escolaSelecionada.contato.telefoneContato}
                                onChange={handleChange}
                                placeholder='(00)0000-0000'
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="contato.emailContato"
                                value={escolaSelecionada.contato.emailContato}
                                onChange={handleChange}
                                placeholder='seuemail@email.com'
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <EnderecoForm endereco={escolaSelecionada.endereco} onChange={handleChange} onCepChange={handleCepChange} />

            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" onClick={() => navigate("/buscar-escolas")}>Cancelar</Button>
                <Button variant="success" onClick={requestPost}>Salvar</Button>
            </div>

        </Container>
    );
};

export default CriarEscola;