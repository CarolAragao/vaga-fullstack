package com.example.catalogoDeLeite.controller;

import com.example.catalogoDeLeite.produto.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("produto")
public class produtoController {

    @Autowired
    private ProdutosRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveProduto (@RequestBody produtoRequestDTO data){
        produto produtoData = new produto(data);
        repository.save(produtoData);
        return;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<ProdutoResponseDTO> getAll() {
        return repository.findAll().stream().map(ProdutoResponseDTO::new).toList();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public void deleteProduto(@PathVariable Long id) {
        repository.deleteById(id);
    }
}