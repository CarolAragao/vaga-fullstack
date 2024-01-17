package com.example.catalogoDeLeite.produto;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "produtos")
@Entity(name = "produtos")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "codigo")

public class produto {
    @Id
    private long codigo;
    private String nome;

    public produto(produtoRequestDTO data) {
        this.codigo = data.codigo();
        this.nome = data.nome();
    }
}