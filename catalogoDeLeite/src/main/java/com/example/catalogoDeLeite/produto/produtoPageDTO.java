package com.example.catalogoDeLeite.produto;

import java.util.List;

public record produtoPageDTO(List<ProdutoResponseDTO> content, long totalElements, int totalPages, int number) {
    // Constructor and other methods can be added if needed
}
