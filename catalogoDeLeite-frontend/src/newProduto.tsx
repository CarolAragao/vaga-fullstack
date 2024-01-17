import React, { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Produto} from './types';


interface NewProdutoProps {
  handleSearch: () => void;
  data: Produto[];
  setData: React.Dispatch<React.SetStateAction<Produto[]>>;
}

const NewProduto: React.FC<NewProdutoProps> = ({ handleSearch, data, setData }) => {
  const [newCodigo, setNewCodigo] = useState('');
  const [newNome, setNewNome] = useState('');

  //cadastro de novo produto.
  const handleCadastrar = async () => {
    if (newCodigo.trim() === '' || newNome.trim() === '') {
      toast.error('Por favor, preencha os campos "Código" e "Nome" para cadastrar um novo produto.', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true        
      });
      return;
    }

    //verificação se existe algum outro item com o mesmo código.
    const codigoExists = data.some((produto) => produto.codigo === parseInt(newCodigo, 10));
    if (codigoExists) {
      toast.error('Já existe um produto cadastrado com esse código.', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true
      }  )
      return;    
    }

    const newProduto: Produto = {
      codigo: parseInt(newCodigo, 10),
      nome: newNome,
    };

    
    try {
      const response = await fetch('http://localhost:8080/produto', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduto),
      });

      if (!response.ok) {
        throw new Error('Failed to save the new Produto.');
      }

      setNewCodigo('');
      setNewNome('');

      setData((prevData) => [...prevData, newProduto]);

      toast.success('Produto cadastrado com sucesso!', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: true        
      });

      //realizando busca novamente para inclusão de novo item.
      handleSearch();    

    } catch (error) {
      console.error('Error saving the new Produto:', error);

      toast.error('Erro ao cadastrar o novo produto. Por favor, tente novamente.', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: true        
      });
    }
  };

  const handleInputChangeCodigo = (event: ChangeEvent<HTMLInputElement>) => {
    setNewCodigo(event.target.value);
  };

  const handleInputChangeNome = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNome(event.target.value);
  };

  return (
    <div className="NewItem">
      <h2>Cadastrar novo produto</h2>
      <div className="inputContainer">
        <div>
          <p>Código</p>
          <input type="text" value={newCodigo} onChange={handleInputChangeCodigo} />
        </div>
        <div>
          <p>Nome</p>
          <input type="text" value={newNome} onChange={handleInputChangeNome} />
        </div>
      </div>
      <button onClick={handleCadastrar}>Cadastrar</button>
    </div>
  );
};

export default NewProduto;