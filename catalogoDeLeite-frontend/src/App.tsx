import { useState, ChangeEvent} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Table from './tableProdutos';
import Home from './home';
import NewProduto from './newProduto';
import { Produto,SortOrder } from './types';

function App() {
  
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState<Produto[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortedColumn, setSortedColumn] = useState<keyof Produto | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:8080/produto');
      const result: Produto[] = await response.json();

      const filteredResult: Produto[] =
        searchInput.trim() !== ''
          ? result.filter(
              (produto) =>
                produto.nome.toLowerCase().includes(searchInput.toLowerCase()) ||
                produto.codigo.toString().includes(searchInput.trim())
            )
          : result;

      if (filteredResult.length === 0) {
        toast.warning(`Nenhum resultado encontrado para: ${searchInput}`, {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: true          
        });      
      }

      setData(filteredResult);
      setSearchPerformed(true);
      setSortedColumn(null);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function handleInputChange({ target }: ChangeEvent<HTMLInputElement>) {
    setSearchInput(target.value);
  }

  const handlePagination = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage * itemsPerPage < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };
 
  const handleDelete = async (codigo: number) => {
    try {
      const response = await fetch(`http://localhost:8080/produto/${codigo}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the Produto.');
      }
      
      handleSearch();
      
      toast.success('Produto excluído com sucesso!', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: true        
      });
    } catch (error) {
      console.error('Error deleting the Produto:', error);

      toast.error('Erro ao excluir o produto. Por favor, tente novamente.', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: true        
      });
    }
  };

  //lidando com a ordenação dos itens
  const handleSort = <K extends keyof Produto>(column: K) => {
    const newSortOrder = column === sortedColumn ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortOrder(newSortOrder);
    setSortedColumn(column);

    const sortedData = [...data].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a[column].toString().localeCompare(b[column].toString());
      } else {
        return b[column].toString().localeCompare(a[column].toString());
      }
    });

    setData(sortedData);
  };

  const handleColumnClick = <K extends keyof { codigo: number; nome: string }>(column: K) => {
    handleSort(column);
    setSortedColumn(column);
  };


  return (
    <div className="App">
      <Router>      
        <Routes>
          <Route
            path="/"
            element={
              <Home 
                handleSearch={handleSearch} 
                handleInputChange={handleInputChange} 
                searchInput={searchInput} 
                />}
            />
        </Routes>
      </Router>
          {searchPerformed && (
            <>              
            <Table
              data={data}
              handleSort={handleSort}
              sortOrder={sortOrder}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              handleDelete={handleDelete}
              handlePagination={handlePagination}
              handleColumnClick={handleColumnClick}
            />                
              <NewProduto 
                handleSearch={handleSearch}
                data={data} 
                setData={setData}
                 />              
            </>
          )}       
      <ToastContainer />
    </div>
  );
}

export default App;