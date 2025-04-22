import axios from 'axios';
import EnderecoForm from '../components/EnderecoForm';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CriarAlunos = () => {
    const baseUrl = "https://localhost:44338/api/aluno";
    const navigate = useNavigate();

    const [data, setData] = useState([]);

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
        }
    });

    useEffect(() => {
        const carregarAlunos = async () => {
            try {
                const response = await axios.get(baseUrl);
                setData(response.data);
            } catch (error) {
                console.error("Erro ao carregar alunos:", error);
            }
        };

        carregarAlunos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('endereco.')) {
            const field = name.split('.')[1];
            setAlunoSelecionado(prev => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    [field]: value
                }
            }));
        } else if (name.startsWith('contato.')) {
            const field = name.split('.')[1];
            setAlunoSelecionado(prev => ({
                ...prev,
                contato: {
                    ...prev.contato,
                    [field]: value
                }
            }));
        } else {
            const booleanFields = ['emancipado', 'alfabetizado', 'deficiencia'];
            setAlunoSelecionado(prev => ({
                ...prev,
                [name]: booleanFields.includes(name) ? value === 'true' : value
            }));
        }
    };

    const requestPost = async () => {
        const alunoParaEnviar = {
            ...alunoSelecionado,
            endereco: { ...alunoSelecionado.endereco },
            contato: { ...alunoSelecionado.contato }
        };

        delete alunoParaEnviar.idAluno;

        try {
            const response = await axios.post(baseUrl, alunoParaEnviar);
            setData([...data, response.data]);
            navigate(`/ver-alunos/${response.data.idAluno}`);
        } catch (error) {
            console.error("Erro ao cadastrar aluno:", error.response?.data);
        }
    };

    const handleCepChange = (e) => {
        let rawValue = e.target.value.replace(/\D/g, ""); // remove tudo que não for número
    
        if (rawValue.length > 8) rawValue = rawValue.slice(0, 8);
    
        let formatted = rawValue;
        if (rawValue.length > 5) {
            formatted = `${rawValue.slice(0, 5)}-${rawValue.slice(5)}`;
        }

        setAlunoSelecionado(prev => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                cep: formatted
            }
        }));
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
      
        setAlunoSelecionado(prev => ({
            ...prev,
            [name]: formatted}
        ));
      };

      const handleCpfChange = (e) => {
        let rawValue = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

        if (rawValue.length > 11) rawValue = rawValue.slice(0, 11);

        let formatted = rawValue;
        if (rawValue.length > 9) {
            formatted = `${rawValue.slice(0, 3)}.${rawValue.slice(3, 6)}.${rawValue.slice(6, 9)}-${rawValue.slice(9, 11)}`;
        } else if (rawValue.length > 6) {
            formatted = `${rawValue.slice(0, 3)}.${rawValue.slice(3, 6)}.${rawValue.slice(6)}`;
        } else if (rawValue.length > 3) {
            formatted = `${rawValue.slice(0, 3)}.${rawValue.slice(3)}`;
        }
    
        setAlunoSelecionado(prev => ({
            ...prev,
            cpf: formatted
        }));
      }

      const handleTelefoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // remove tudo que não for número
      
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
      
        setAlunoSelecionado(prev => ({ 
            ...prev,
            contato: {
                ...prev.contato,
                telefoneContato: formatted 
            }
        }));
      };
    return (
        <Container className="my-4">
            <h2 className="mb-4">Cadastro de Aluno</h2>

            <Card className="mb-4">
                <Card.Header>Dados Pessoais</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome Completo</Form.Label>
                                <Form.Control 
                                    name="nomeAluno" 
                                    value={alunoSelecionado.nomeAluno} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Sexo</Form.Label>
                                <Form.Select name="sexo" value={alunoSelecionado.sexo} onChange={handleChange}>
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
                                    value={alunoSelecionado.datadeNascimento} 
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
                                    value={alunoSelecionado.nomeMae} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome do Pai</Form.Label>
                                <Form.Control 
                                    name="nomePai" 
                                    value={alunoSelecionado.nomePai} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Emancipado</Form.Label>
                                <Form.Select name="emancipado" value={alunoSelecionado.emancipado} onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="true">Sim</option>
                                    <option value="false">Não</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Alfabetizado</Form.Label>
                                <Form.Select name="alfabetizado" value={alunoSelecionado.alfabetizado} onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="true">Sim</option>
                                    <option value="false">Não</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Deficiência</Form.Label>
                                <Form.Select name="deficiencia" value={alunoSelecionado.deficiencia} onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="true">Sim</option>
                                    <option value="false">Não</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    {alunoSelecionado.deficiencia === true && (
                        <Form.Group className="mb-3">
                            <Form.Label>Especifique a Deficiência</Form.Label>
                            <Form.Control 
                                name="deficienciaEspecificar" 
                                value={alunoSelecionado.deficienciaEspecificar} 
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
                                value={alunoSelecionado.cpf} 
                                onChange={handleCpfChange} 
                                placeholder='000.000.000-00'
                            />
                         </Col>
                        <Col md={4}>
                            <Form.Label>Nome Social</Form.Label>
                            <Form.Control 
                                name="nomeSocial" 
                                value={alunoSelecionado.nomeSocial} 
                                onChange={handleChange} 
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Label>RG</Form.Label>
                            <Form.Control 
                                name="rg" 
                                value={alunoSelecionado.rg} 
                                onChange={handleChange} 
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={4}>
                            <Form.Label>Órgão Emissor</Form.Label>
                            <Form.Control 
                                name="orgaoEmissor" 
                                value={alunoSelecionado.orgaoEmissor} 
                                onChange={handleChange} 
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Label>UF Emissor</Form.Label>
                            <Form.Control 
                                name="ufEmissor" 
                                value={alunoSelecionado.ufEmissor} 
                                onChange={handleChange} 
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Label>Data de Emissão</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="datadeEmissao" 
                                value={alunoSelecionado.datadeEmissao} 
                                onChange={handleDataChange} 
                                placeholder='dd/mm/aaaa'
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <EnderecoForm endereco={alunoSelecionado.endereco} onChange={handleChange} onCepChange={handleCepChange} />

            <Card className="mb-4">
                <Card.Header>Contato</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control 
                                name="contato.telefoneContato" 
                                value={alunoSelecionado.contato.telefoneContato} 
                                onChange={handleTelefoneChange}
                                placeholder='(00)0000-0000' 
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                name="contato.emailContato" 
                                value={alunoSelecionado.contato.emailContato} 
                                onChange={handleChange} 
                                placeholder='seuemail@email.com'
                        />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="mb-4">
                <Card.Header>Transporte</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Label>Transporte</Form.Label>
                            <Form.Select name="transporte" value={alunoSelecionado.transporte} onChange={handleChange}>
                                <option value="">Selecione</option>
                                <option value="NaoUtiliza">Não Utiliza</option>
                                <option value="Municipal">Municipal</option>
                                <option value="Estadual">Estadual</option>
                            </Form.Select>
                        </Col>
                        <Col md={6}>
                            <Form.Label>Tipo de Transporte</Form.Label>
                            <Form.Select name="tipoTransporte" value={alunoSelecionado.tipoTransporte} onChange={handleChange}>
                                <option value="">Selecione</option>
                                <option value="RodoviarioVanKombi">Van/Kombi</option>
                                <option value="RodoviarioOnibus">Ônibus</option>
                                <option value="RodoviarioMicro">Microônibus</option>
                                <option value="RodoviarioBicicleta">Bicicleta</option>
                                <option value="RodoviarioTracaoAnimal">Tração Animal</option>
                                <option value="RodoviarioOutro">Outro</option>
                                <option value="Aquaviario">Aquaviário</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" onClick={() => navigate("/buscar-alunos")}>Cancelar</Button>
                <Button variant="success" onClick={requestPost}>Salvar</Button>
            </div>
        </Container>
    );
};

export default CriarAlunos;