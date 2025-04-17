import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EnderecoForm from "../components/EnderecoForm";
import {  Modal, ModalBody, ModalFooter } from 'reactstrap';

const EditarAluno = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const baseUrl = "https://localhost:44338/api/aluno";

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
        },
        idContato: 0,
        idEndereco: 0 
      });

    useEffect(() => {
        const carregarAluno = async () => {
            try {
                const response = await axios.get(`https://localhost:44338/api/aluno/${id}`);
                const aluno = response.data;

                aluno.datadeNascimento = aluno.datadeNascimento?.split("T")[0] || "";
                aluno.datadeEmissao = aluno.datadeEmissao?.split("T")[0] || "";

                setAlunoSelecionado(aluno);
            } catch (error) {
                console.error("Erro ao carregar aluno:", error);
            }
        };

        carregarAluno();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Se for um campo aninhado (contato ou endereco)
        if (name.startsWith("contato.")) {
            const campo = name.split(".")[1];
            setAlunoSelecionado(prev => ({
                ...prev,
                contato: {
                    ...prev.contato,
                    [campo]: value
                }
            }));
        } else if (name.startsWith("endereco.")) {
            const campo = name.split(".")[1];
            setAlunoSelecionado(prev => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    [campo]: value
                }
            }));
        } else {
            setAlunoSelecionado(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const requestPut = async () => {
        try {
            await axios.put(`https://localhost:44338/api/aluno/${id}`, alunoSelecionado);
            alert("Aluno atualizado com sucesso!");
            navigate("/buscar-alunos");
        } catch (error) {
            console.error("Erro ao atualizar aluno:", error);
            alert("Erro ao atualizar aluno.");
        }
    };

    const requestDelete = async () => {
        await axios.delete(baseUrl + "/" + alunoSelecionado.idAluno)
          .then(response => {
            setData(data.filter(aluno => aluno.idAluno!== alunoSelecionado.idAluno));
            abrirFecharModalExcluir();
            navigate("/buscar-alunos");
          }).catch(error=>{
            console.log(error);
          })
      }

    const abrirFecharModalExcluir = () =>
        setModalExcluir(!modalExcluir);

    return (
        <div className="container">
            <h1 className="text-center mb-4">Editar Aluno</h1>
            <div className="form-group">
                <label>Nome: </label>
                <input type="text" name="nomeAluno"
                    value={alunoSelecionado.nomeAluno}
                    onChange={handleChange}
                    className="form-control"
                    placeholder='Nome Completo' />
                <label>CPF: </label>
                <input type="text" name="cpf"
                    value={alunoSelecionado.cpf}
                    onChange={handleChange}
                    className="form-control" />
                <label>Nome Social: </label>
                <input type="text" name="nomeSocial"
                    value={alunoSelecionado.nomeSocial}
                    onChange={handleChange}
                    className="form-control" />
                <label>Nome da Mãe: </label>
                <input type="text" name="nomeMae"
                    value={alunoSelecionado.nomeMae}
                    onChange={handleChange}
                    className="form-control" />
                <label>Nome do Pai: </label>
                <input type="text" name="nomePai"
                    value={alunoSelecionado.nomePai}
                    onChange={handleChange}
                    className="form-control" />   
                <label>Emancipado: </label>
                <select name="emancipado"
                    value={alunoSelecionado.emancipado}
                    onChange={handleChange}
                    className="form-control">
                    <option value="">Selecione</option>
                    <option value={true}>Sim</option>
                    <option value={false}>Não</option>
                </select>
                <label>Alfabetizado: </label>
                <select name="alfabetizado"
                    value={alunoSelecionado.alfabetizado}
                    onChange={handleChange}
                    className="form-control">
                    <option value="">Selecione</option>
                    <option value={true}>Sim</option>
                    <option value={false}>Não</option>
                </select>
                <label>Deficiência: </label>
                <select name="deficiencia"
                    value={alunoSelecionado.deficiencia}
                    onChange={handleChange}
                    className="form-control">
                    <option value="">Selecione</option>
                    <option value={true}>Sim</option>
                    <option value={false}>Não</option>
                </select>
                <label>Especifique Deficiência: </label>
                <input type="text" name="deficienciaEspecificar"
                    value={alunoSelecionado.deficienciaEspecificar}
                    onChange={handleChange}
                    className="form-control" 
                    rows={4}/>                                     
                <label>Sexo: </label>
                <select name="sexo" value={alunoSelecionado.sexo} onChange={handleChange} className="form-control">
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </select>
                <label>Estado Civil: </label>
                <select name="estadoCivil" value={alunoSelecionado.estadoCivil} onChange={handleChange} className="form-control">
                    <option value="">Selecione</option>
                    <option value="Solteiro">Solteiro</option>
                    <option value="Casado">Casado</option>
                    <option value="Divorciado">Divorciado</option>
                    <option value="Viuvo">Viúvo</option>
                    <option value="Outro">Outro</option>
                </select>
                <label>Data de Nascimento: </label>
                <input type="date" name="datadeNascimento"
                    value={alunoSelecionado.datadeNascimento}
                    onChange={handleChange}
                    className="form-control" />
                <label>Status: </label>
                <select name="status" value={alunoSelecionado.status} onChange={handleChange} className='form-control'>
                    <option value="">Selecione</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                    <option value="Transferido">Transferido</option>
                    <option value="Falecido">Falecido</option>
                </select>
                <label>Código INEP: </label>
                <input type="text" name="numeroInep"
                    value={alunoSelecionado.numeroInep}
                    onChange={handleChange}
                    className="form-control" />
                <label>Código Estadual: </label>
                <input type="text" name="numeroRa"
                    value={alunoSelecionado.numeroRa}
                    onChange={handleChange}
                    className="form-control" />
                <label>RG: </label>
                <input type="text" name="rg"
                    value={alunoSelecionado.rg}
                    onChange={handleChange}
                    className="form-control" />
                <label>Órgão Emissor: </label>
                <input type="text" name="orgaoEmissor"
                    value={alunoSelecionado.orgaoEmissor}
                    onChange={handleChange}
                    className="form-control" />
                 <label>UF Emissor: </label>
                <input type="text" name="ufEmissor"
                    value={alunoSelecionado.ufEmissor}
                    onChange={handleChange}
                    className="form-control" />                   
                <label>Data de Emissão: </label>
                <input type="date" name="datadeEmissao"
                    value={alunoSelecionado.datadeEmissao}
                    onChange={handleChange}
                    className="form-control" />
                <label>Número do NIS (PIS/PASEP): </label>
                <input type="text" name="numeroNisPisPasep"
                    value={alunoSelecionado.numeroNisPisPasep}
                    onChange={handleChange}
                    className="form-control" />
                <label>Número do SUS: </label>
                <input type="text" name="numeroSus"
                    value={alunoSelecionado.numeroSus}
                    onChange={handleChange}
                    className="form-control" />
                <label>Etnia: </label>
                <select name="etnia" value={alunoSelecionado.etnia} onChange={handleChange} className="form-control">
                    <option value="">Selecione</option>
                    <option value="Branca">Branca</option>
                    <option value="Preta">Preta</option>
                    <option value="Parda">Parda</option>
                    <option value="Amarela">Amarela</option>
                    <option value="Indigena">Indígena</option>
                    <option value="Outro">Outro</option>
                </select>
                <hr />
                <EnderecoForm
                    endereco={alunoSelecionado.endereco}
                    onChange={handleChange}
                />
                <hr />
                <h5>Transporte</h5>
                <label>Transporte: </label>
                <select name="transporte" value={alunoSelecionado.transporte} onChange={handleChange} className='form-control'>
                    <option value="">Selecione</option>
                    <option value="NaoUtiliza">Não Utiliza</option>
                    <option value="Municipal">Municipal</option>
                    <option value="Estadual">Estadual</option>
                </select>
                <label>Tipo de transporte: </label>
                <select name="tipoTransporte" value={alunoSelecionado.tipoTransporte} onChange={handleChange} className="form-control">
                    <option value="">Selecione</option>
                    <option value="RodoviarioVanKombi">Rodoviário Van/Kombi</option>
                    <option value="RodoviarioOnibus">Rodoviário Ônibus</option>
                    <option value="RodoviarioMicro">Rodoviário Microônibus</option>
                    <option value="RodoviarioBicicleta">Rodoviário Bicicleta</option>
                    <option value="RodoviarioTracaoAnimal">Rodoviário Tração Animal</option>
                    <option value="RodoviarioOutro">Rodoviário Outro</option>
                    <option value="Aquaviario">Aquaviário</option>
                </select>                
                <hr />
                <h5>Contato</h5>
                <input type="text" name="telefone"
                    value={alunoSelecionado.contato.telefoneContato}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Telefone" />
                <input type="text" name="email"
                    value={alunoSelecionado.contato.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Email" />
                <hr />
            </div>
            <button className="btn btn-success" onClick={requestPut}>Atualizar</button>
            <button className="btn btn-secondary" onClick={() => navigate(`/ver-aluno/${alunoSelecionado.idAluno}`)}>Cancelar</button>
            <button className="btn btn-danger" onClick={() => abrirFecharModalExcluir()}>Excluir</button>
            <Modal isOpen={modalExcluir}>
                <ModalBody>
                    Confirma a exclusão de {alunoSelecionado.nomeAluno}?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-danger' onClick={() => requestDelete()}>Sim</button>
                    <button className='btn btn-secondary' onClick={() => abrirFecharModalExcluir()}>Não</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default EditarAluno;
