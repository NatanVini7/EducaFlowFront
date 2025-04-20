import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Row, Col } from 'react-bootstrap';

const EnderecoForm = ({ endereco = {}, onChange, onCepChange }) => {
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:44338/api/endereco/estados')
            .then(res => setEstados(res.data))
            .catch(err => console.error('Erro ao buscar estados:', err));
    }, []);

    useEffect(() => {
        if (endereco.estado) {
            axios.get(`https://localhost:44338/api/endereco/estados/${endereco.estado}/cidades`)
                .then(res => setCidades(res.data))
                .catch(err => console.error('Erro ao buscar cidades:', err));
        } else {
            setCidades([]);
        }
    }, [endereco.estado]);

    return (
        <Card className="mb-4">
            <Card.Header>Endereço</Card.Header>
            <Card.Body>
                <Row>
                    <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Logradouro</Form.Label>
                            <Form.Control name="endereco.logradouro" value={endereco.logradouro ?? ''} onChange={onChange} />
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                    <Form.Group className="mb-3">
                        <Form.Label>Número</Form.Label>
                        <Form.Control name="endereco.numero" value={endereco.numero ?? ''} onChange={onChange} />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Complemento</Form.Label>
                        <Form.Control name="endereco.complemento" value={endereco.complemento ?? ''} onChange={onChange} />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control name="endereco.bairro" value={endereco.bairro ?? ''} onChange={onChange} />
                    </Form.Group>
                </Col>
                </Row>
                <Row>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select name="endereco.estado" value={endereco.estado ?? ''}
                            onChange={(e) => {
                            const sigla = e.target.value;
                            onChange({
                                target: {
                                    name: 'endereco.estado',
                                    value: sigla
                                }
                            });
                        }}>
                            <option value="">Selecione um estado</option>
                            {estados.map(uf => (
                                <option key={uf.sigla} value={uf.sigla}>
                                    {uf.nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Select name="endereco.cidade" value={endereco.cidade ?? ''}
                            onChange={(e) => {
                            const nome = e.target.value;
                            onChange({
                                target: {
                                    name: 'endereco.cidade',
                                    value: nome
                                }
                            });
                        }}
                        disabled={!endereco.estado}
                        >
                            <option value="">Selecione uma cidade</option>
                            {cidades.map(cidade => (
                                <option key={cidade.nome} value={cidade.nome}>
                                    {cidade.nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control 
                            name="endereco.cep" 
                            value={endereco.cep ?? ''} 
                            onChange={(e) => {
                                onChange(e);
                                onCepChange(e)
                            }}
                            placeholder='00000-000' 
                        />
                    </Form.Group>
                </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default EnderecoForm;
