import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EnderecoForm from "../components/EnderecoForm";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

const EditarAluno = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        const response = await axios.get(`${baseUrl}/${id}`);
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

    if (name.startsWith("contato.")) {
      const campo = name.split(".")[1];
      setAlunoSelecionado((prev) => ({
        ...prev,
        contato: {
          ...prev.contato,
          [campo]: value
        }
      }));
    } else if (name.startsWith("endereco.")) {
      const campo = name.split(".")[1];
      setAlunoSelecionado((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [campo]: value
        }
      }));
    } else {
      setAlunoSelecionado((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const requestPut = async () => {
    try {
      await axios.put(`${baseUrl}/${id}`, alunoSelecionado);
      alert("Aluno atualizado com sucesso!");
      navigate("/buscar-alunos");
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      alert("Erro ao atualizar aluno.");
    }
  };

  const requestDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/${alunoSelecionado.idAluno}`);
      abrirFecharModalExcluir();
      navigate("/buscar-alunos");
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    }
  };

  const abrirFecharModalExcluir = () =>
    setModalExcluir(!modalExcluir);

  const handleDataChange = (e) => {
    let { name, value } = e.target;
    let rawValue = value.replace(/\D/g, ""); // remove tudo que não for número
  
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
    let rawValue = e.target.value.replace(/\D/g, ""); 

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
    let value = e.target.value.replace(/\D/g, "");
  
    if (value.length > 11) value = value.slice(0, 11);
  
    let formatted = value;
    if (value.length >= 11) {
      formatted = `(${value.slice(0, 2)})${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length >= 7) {
      formatted = `(${value.slice(0, 2)})${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length >= 3) {
        formatted = `(${value.slice(0, 2)})${value.slice(2)}`
    } else if (value.length > 1) {
        formatted = `(${value}`
    }
  
    setAlunoSelecionado(prev => ({ 
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

    setAlunoSelecionado(prev => ({
        ...prev,
        endereco: {
            ...prev.endereco,
            cep: formatted
        }
    }));
};

return (
  <div className="container my-4">
    <h2 className="text-center mb-4">Editar Aluno</h2>

    {/* DADOS PESSOAIS */}
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Dados Pessoais</h5>
      </div>
      <div className="card-body">
        <div className="form-group mb-3">
          <label>Nome Completo</label>
          <input className="form-control" name="nomeAluno" value={alunoSelecionado.nomeAluno} onChange={handleChange} />
        </div>
        <div className="form-group mb-3">
          <label>Nome Social</label>
          <input className="form-control" name="nomeSocial" value={alunoSelecionado.nomeSocial} onChange={handleChange} />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>CPF</label>
            <input className="form-control" name="cpf" value={alunoSelecionado.cpf} onChange={handleCpfChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>RG</label>
            <input className="form-control" name="rg" value={alunoSelecionado.rg} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Órgão Emissor</label>
            <input className="form-control" name="orgaoEmissor" value={alunoSelecionado.orgaoEmissor} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>UF Emissor</label>
            <input className="form-control" name="ufEmissor" value={alunoSelecionado.ufEmissor} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Data de Nascimento</label>
            <input type="date" className="form-control" name="datadeNascimento" value={alunoSelecionado.datadeNascimento} onChange={handleDataChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Data de Emissão</label>
            <input type="date" className="form-control" name="datadeEmissao" value={alunoSelecionado.datadeEmissao} onChange={handleDataChange} />
          </div>
        </div>
      </div>
    </div>

    {/* FILIAÇÃO E IDENTIFICAÇÃO */}
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Filiação e Identificação</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label>Nome da Mãe</label>
          <input className="form-control" name="nomeMae" value={alunoSelecionado.nomeMae} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Nome do Pai</label>
          <input className="form-control" name="nomePai" value={alunoSelecionado.nomePai} onChange={handleChange} />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Código INEP</label>
            <input className="form-control" name="numeroInep" value={alunoSelecionado.numeroInep} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Código Estadual</label>
            <input className="form-control" name="numeroRa" value={alunoSelecionado.numeroRa} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>

    {/* IDENTIFICAÇÃO SOCIAL */}
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Identificação Social</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Etnia</label>
            <select className="form-control" name="etnia" value={alunoSelecionado.etnia} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Branca">Branca</option>
              <option value="Preta">Preta</option>
              <option value="Parda">Parda</option>
              <option value="Amarela">Amarela</option>
              <option value="Indigena">Indígena</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label>Sexo</label>
            <select className="form-control" name="sexo" value={alunoSelecionado.sexo} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label>Estado Civil</label>
            <select className="form-control" name="estadoCivil" value={alunoSelecionado.estadoCivil} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Solteiro">Solteiro</option>
              <option value="Casado">Casado</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Viuvo">Viúvo</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    {/* ENDEREÇO */}
    <EnderecoForm endereco={alunoSelecionado.endereco} onChange={handleChange} onCepChange={handleCepChange} />

    {/* CONTATO */}
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Contato</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 mb-3">
            <input type="text" name="contato.telefoneContato" className="form-control" value={alunoSelecionado.contato.telefoneContato} onChange={handleTelefoneChange} placeholder="Telefone" />
          </div>
          <div className="col-md-6 mb-3">
            <input type="text" name="contato.emailContato" className="form-control" value={alunoSelecionado.contato.emailContato} onChange={handleChange} placeholder="Email" />
          </div>
        </div>
      </div>
    </div>

    {/* AÇÕES */}
    <div className="d-flex gap-3 mb-4">
      <button className="btn btn-success" onClick={requestPut}>Atualizar</button>
      <button className="btn btn-secondary" onClick={() => navigate(`/ver-aluno/${alunoSelecionado.idAluno}`)}>Cancelar</button>
      <button className="btn btn-danger" onClick={abrirFecharModalExcluir}>Excluir</button>
    </div>

    {/* MODAL EXCLUSÃO */}
    <Modal isOpen={modalExcluir}>
      <ModalBody>Confirma a exclusão de {alunoSelecionado.nomeAluno}?</ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={requestDelete}>Sim</button>
        <button className="btn btn-secondary" onClick={abrirFecharModalExcluir}>Não</button>
      </ModalFooter>
    </Modal>
  </div>
  );
}
export default EditarAluno;