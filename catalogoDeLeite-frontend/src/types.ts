
export type SortOrder = 'asc' | 'desc';

export interface Produto {
    codigo: number;
    nome: string;
    [key: string]: number | string;
  }

  export interface TableProps {
    data: Produto[];
    handleSort: (column: keyof { codigo: number; nome: string }) => void;
    sortOrder: SortOrder;
    currentPage: number;
    itemsPerPage: number;
    handleDelete: (codigo: number) => void;
    handlePagination: (direction: 'prev' | 'next') => void;
    handleColumnClick: (column: keyof { codigo: number; nome: string }) => void;
    
  }

  