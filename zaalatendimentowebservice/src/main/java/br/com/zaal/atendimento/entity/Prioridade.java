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
@Table(name = "prioridade", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Prioridade implements Serializable {

    @Id
    private Long id;

    @Column(length = 150, nullable = false, unique = true)
    private String nome;

    public Prioridade() {}

    public Prioridade(Long id) {
        this.id = id;
    }

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
        if (!(o instanceof Prioridade)) return false;
        Prioridade that = (Prioridade) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getNome(), that.getNome());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Prioridade{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                '}';
    }
}