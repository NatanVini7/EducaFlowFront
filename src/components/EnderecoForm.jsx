import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EnderecoForm = ({ endereco = {}, onChange }) => {
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
        <div>
            <h5>Endereço</h5>

            <input
                type="text"
                name="endereco.logradouro"
                value={endereco.logradouro ?? ''}
                onChange={onChange}
                className="form-control"
                placeholder="Logradouro"
            />

            <input
                type="text"
                name="endereco.numero"
                value={endereco.numero ?? ''}
                onChange={onChange}
                className="form-control"
                placeholder="Número"
            />

            <input
                type="text"
                name="endereco.complemento"
                value={endereco.complemento ?? ''}
                onChange={onChange}
                className="form-control"
                placeholder="Complemento"
            />

            <input
                type="text"
                name="endereco.bairro"
                value={endereco.bairro ?? ''}
                onChange={onChange}
                className="form-control"
                placeholder="Bairro"
            />

            <select
                name="endereco.estado"
                value={endereco.estado ?? ''}
                onChange={(e) => {
                    const sigla = e.target.value;
                    onChange({
                        target: {
                            name: 'endereco.estado',
                            value: sigla
                        }
                    });
                }}
                className="form-control"
            >
                <option value="">Selecione um estado</option>
                {estados.map(uf => (
                    <option key={uf.sigla} value={uf.sigla}>
                        {uf.nome}
                    </option>
                ))}
            </select>

            <select
                name="endereco.cidade"
                value={endereco.cidade ?? ''}
                onChange={(e) => {
                    const nome = e.target.value;
                    onChange({
                        target: {
                            name: 'endereco.cidade',
                            value: nome
                        }
                    });
                }}
                className="form-control"
                disabled={!endereco.estado}
            >
                <option value="">Selecione uma cidade</option>
                {cidades.map(cidade => (
                    <option key={cidade.nome} value={cidade.nome}>
                        {cidade.nome}
                    </option>
                ))}
            </select>
            <input
                type="text"
                name="endereco.cep"
                value={endereco.cep ?? ''}
                onChange={onChange}
                className="form-control"
                placeholder="CEP"
            />
        </div>
    );
};

export default EnderecoForm;
