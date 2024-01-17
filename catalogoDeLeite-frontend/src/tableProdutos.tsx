import React, { useState } from 'react';
import {TableProps} from './types';

const Table: React.FC<TableProps> = ({ 
  data,    
  sortOrder, 
  currentPage, 
  itemsPerPage, 
  handleDelete,
  handlePagination,
  handleColumnClick}) => {

  //Criando os indices da página
  const startIndex = (currentPage-1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const displayedData = Array.isArray(data) ? data.slice(startIndex, endIndex) : [];
  const [sortedColumn] = useState<keyof { codigo: number; nome: string } | null>(null);   

  return (        
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>
              Código
              <span className="order-arrow" onClick={() => handleColumnClick('codigo')}>
                {sortOrder === 'asc' && sortedColumn === 'codigo' ? ' ▼' : ' ▲'}
              </span>
            </th>
            <th>
              Nome
              <span className="order-arrow" onClick={() => handleColumnClick('nome')}>
                {sortOrder === 'asc' && sortedColumn === 'nome' ? ' ▼' : ' ▲'}
              </span>
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((produto) => (
            <tr key={produto.codigo}>
              <td>{produto.codigo}</td>
              <td>{produto.nome}</td>
              <td>
                <i className="gg-trash" onClick={() => handleDelete(produto.codigo)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>   

      <div className="pagination">
        <button onClick={() => handlePagination('prev')} disabled={currentPage === 1}>
          &#x25C0;
        </button>
        <button onClick={() => handlePagination('next')}disabled={currentPage * itemsPerPage >= data.length}>&#x25B6;</button>
      </div>
    </div>
 
  );
};

export default Table;