package br.com.zaal.atendimento.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "funcao", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Funcao implements Serializable {

    @Id
    private Long id;

    @Column(length = 150, nullable = false, unique = true)
    private String nome;

    public Funcao() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Funcao)) return false;
        Funcao funcao = (Funcao) o;
        return Objects.equals(getId(), funcao.getId()) &&
                Objects.equals(getNome(), funcao.getNome());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getNome());
    }

    @Override
    public String toString() {
        return "Funcao{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                '}';
    }
}
