package com.example.catalogoDeLeite.produto;

public record ProdutoResponseDTO(long codigo, String nome) {

    public ProdutoResponseDTO(produto produto){
        this(produto.getCodigo(), produto.getNome());
    }

}