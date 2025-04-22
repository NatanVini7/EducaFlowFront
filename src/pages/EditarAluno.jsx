import axios from 'axios';
import EnderecoForm from '../components/EnderecoForm';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

const EditarAlunos = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const baseUrl = `https://localhost:44338/api/aluno/${id}`;
    const [modalExcluir, setModalExcluir] = useState(false);

    const [aluno, setAluno] = useState({
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
        }
    });

    useEffect(() => {
        const carregarAluno = async () => {
            try {
                const response = await axios.get(baseUrl);
                setAluno(response.data);
            } catch (error) {
                console.error("Erro ao carregar aluno:", error);
            }
        };

        carregarAluno();
    }, [baseUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('endereco.')) {
            const field = name.split('.')[1];
            setAluno(prev => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    [field]: value
                }
            }));
        } else if (name.startsWith('contato.')) {
            const field = name.split('.')[1];
            setAluno(prev => ({
                ...prev,
                contato: {
                    ...prev.contato,
                    [field]: value
                }
            }));
        } else {
            const booleanFields = ['emancipado', 'alfabetizado', 'deficiencia'];
            setAluno(prev => ({
                ...prev,
                [name]: booleanFields.includes(name) ? value === 'true' : value
            }));
        }
    };

    const handleDataChange = (e) => {
        let { name, value } = e.target;
        let rawValue = value.replace(/\D/g, "");
        if (rawValue.length > 8) rawValue = rawValue.slice(0, 8);

        let formatted = rawValue;
        if (rawValue.length >= 5) {
            formatted = `${rawValue.slice(0, 2)}/${rawValue.slice(2, 4)}/${rawValue.slice(4)}`;
        } else if (rawValue.length >= 3) {
            formatted = `${rawValue.slice(0, 2)}/${rawValue.slice(2)}`;
        }

        setAluno(prev => ({ ...prev, [name]: formatted }));
    };

    const handleCpfChange = (e) => {
        let rawValue = e.target.value.replace(/\D/g, "");
        if (rawValue.length > 11) rawValue = rawValue.slice(0, 11);

        let formatted = rawValue;
        if (rawValue.length > 9) {
            formatted = `${rawValue.slice(0, 3)}.${rawValue.slice(3, 6)}.${rawValue.slice(6, 9)}-${rawValue.slice(9)}`;
        } else if (rawValue.length > 6) {
            formatted = `${rawValue.slice(0, 3)}.${rawValue.slice(3, 6)}.${rawValue.slice(6)}`;
        } else if (rawValue.length > 3) {
            formatted = `${rawValue.slice(0, 3)}.${rawValue.slice(3)}`;
        }

        setAluno(prev => ({ ...prev, cpf: formatted }));
    };

    const handleTelefoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        let formatted = value;
        if (value.length >= 11) {
            formatted = `(${value.slice(0, 2)})${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length >= 7) {
            formatted = `(${value.slice(0, 2)})${value.slice(2, 6)}-${value.slice(6)}`;
        } else if (value.length >= 3) {
            formatted = `(${value.slice(0, 2)})${value.slice(2)}`;
        } else if (value.length > 1) {
            formatted = `(${value}`;
        }

        setAluno(prev => ({
            ...prev,
            contato: {
                ...prev.contato,
                telefoneContato: formatted
            }
        }));
    };

    const handleCepChange = (e) => {
        let rawValue = e.target.value.replace(/\D/g, "");
        if (rawValue.length > 8) rawValue = rawValue.slice(0, 8);

        let formatted = rawValue;
        if (rawValue.length > 5) {
            formatted = `${rawValue.slice(0, 5)}-${rawValue.slice(5)}`;
        }

        setAluno(prev => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                cep: formatted
            }
        }));
    };

    const requestPut = async () => {
        try {
            await axios.put(baseUrl, aluno);
            navigate(`/ver-alunos/${id}`);
        } catch (error) {
            console.error("Erro ao atualizar aluno:", error.response?.data);
        }
    };

    const requestDelete = async () => {
        try {
          await axios.delete(`${baseUrl}/${aluno.idAluno}`);
          abrirFecharModalExcluir();
          navigate("/buscar-alunos");
        } catch (error) {
          console.error("Erro ao excluir aluno:", error);
        }
      };
    
      const abrirFecharModalExcluir = () =>
        setModalExcluir(!modalExcluir);

    return (
        <Container className="my-4">
            <h2 className="mb-4">Editar Aluno</h2>

            <Card className="mb-4">
                <Card.Header>Dados Pessoais</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome Completo</Form.Label>
                                <Form.Control 
                                    name="nomeAluno" 
                                    value={aluno.nomeAluno} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Sexo</Form.Label>
                                <Form.Select name="sexo" value={aluno.sexo} onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Outro">Outro</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Data de Nascimento</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="datadeNascimento" 
                                    value={aluno.datadeNascimento} 
                                    onChange={handleDataChange} 
                                    placeholder='dd/mm/aaaa'
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome da Mãe</Form.Label>
                                <Form.Control 
                                    name="nomeMae" 
                                    value={aluno.nomeMae} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome do Pai</Form.Label>
                                <Form.Control 
                                    name="nomePai" 
                                    value={aluno.nomePai} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Emancipado</Form.Label>
                                <Form.Select name="emancipado" value={aluno.emancipado} onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="true">Sim</option>
                                    <option value="false">Não</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Alfabetizado</Form.Label>
                                <Form.Select name="alfabetizado" value={aluno.alfabetizado} onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="true">Sim</option>
                                    <option value="false">Não</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Deficiência</Form.Label>
                                <Form.Select name="deficiencia" value={aluno.deficiencia} onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="true">Sim</option>
                                    <option value="false">Não</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    {aluno.deficiencia === true && (
                        <Form.Group className="mb-3">
                            <Form.Label>Especifique a Deficiência</Form.Label>
                            <Form.Control 
                                name="deficienciaEspecificar" 
                                value={aluno.deficienciaEspecificar} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    )}
                </Card.Body>
            </Card>

            <Card className="mb-4">
                <Card.Header>Documentos</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={4}>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                name="cpf"
                                value={aluno.cpf} 
                                onChange={handleCpfChange} 
                                placeholder='000.000.000-00'
                            />
                         </Col>
                        <Col md={4}>
                            <Form.Label>Nome Social</Form.Label>
                            <Form.Control 
                                name="nomeSocial" 
                                value={aluno.nomeSocial} 
                                onChange={handleChange} 
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Label>RG</Form.Label>
                            <Form.Control 
                                name="rg" 
                                value={aluno.rg} 
                                onChange={handleChange} 
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={4}>
                            <Form.Label>Órgão Emissor</Form.Label>
                            <Form.Control 
                                name="orgaoEmissor" 
                                value={aluno.orgaoEmissor} 
                                onChange={handleChange} 
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Label>UF Emissor</Form.Label>
                            <Form.Control 
                                name="ufEmissor" 
                                value={aluno.ufEmissor} 
                                onChange={handleChange} 
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Label>Data de Emissão</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="datadeEmissao" 
                                value={aluno.datadeEmissao} 
                                onChange={handleDataChange} 
                                placeholder='dd/mm/aaaa'
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>


            <EnderecoForm
                endereco={aluno.endereco}
                handleChange={handleChange}
                handleCepChange={handleCepChange}
            />

            <Card className="mb-4">
                <Card.Header>Contato</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="contato.telefoneContato"
                                    value={aluno.contato.telefoneContato}
                                    onChange={handleTelefoneChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="contato.emailContato"
                                    value={aluno.contato.emailContato}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* TRANSPORTE */}
            <Card className="mb-4">
                <Card.Header>Transporte</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Utiliza Transporte?</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="transporte"
                                    value={aluno.transporte}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione</option>
                                    <option value="Sim">Sim</option>
                                    <option value="Não">Não</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Tipo de Transporte</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tipoTransporte"
                                    value={aluno.tipoTransporte}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" onClick={() => navigate("/buscar-alunos")}>Cancelar</Button>
                <Button className="btn btn-danger" onClick={abrirFecharModalExcluir}>Excluir</Button>
                <Button variant="success" onClick={requestPut}>Salvar Alterações</Button>
            </div>
            <Modal isOpen={modalExcluir}>
                <ModalBody>Confirma a exclusão de {aluno.nomeAluno}?</ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={requestDelete}>Sim</button>
                    <button className="btn btn-secondary" onClick={abrirFecharModalExcluir}>Não</button>
                </ModalFooter>
            </Modal>

        </Container>
    );
};

export default EditarAlunos;