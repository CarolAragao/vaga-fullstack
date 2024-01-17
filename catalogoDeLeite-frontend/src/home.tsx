import React from 'react';

interface HomeProps  {
    handleSearch: () => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchInput: string;    
}

const Home: React.FC<HomeProps> = ({
                                handleSearch, 
                                handleInputChange, 
                                searchInput}) =>{ 
 
    return(   
        <header className="App-header">
            <h1>Catálogo de Leite</h1>
            <p>Digite os dados para busca</p>
            <div className="search-container">
                <input type="text" value={searchInput} onChange={handleInputChange} />
                <button onClick={handleSearch}>Buscar <span>&gt;</span></button>
            </div>
        </header>    
        );
}

export default Home;