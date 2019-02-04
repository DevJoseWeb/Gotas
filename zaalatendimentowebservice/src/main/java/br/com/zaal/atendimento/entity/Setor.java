package br.com.zaal.atendimento.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "setor", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Setor implements Serializable {

    @Id
    private Long id;

    @Column(length = 150, nullable = false, unique = true)
    private String nome;

    @OneToOne
    @JoinColumn(name = "fksetor_pai")
    private Setor setorPai;

    public Setor() {}

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

    public Setor getSetorPai() {
        return setorPai;
    }

    public void setSetorPai(Setor setorPai) {
        this.setorPai = setorPai;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Setor)) return false;
        Setor setor = (Setor) o;
        return Objects.equals(getId(), setor.getId()) &&
                Objects.equals(getNome(), setor.getNome()) &&
                Objects.equals(getSetorPai(), setor.getSetorPai());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Setor{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", setorPai=" + setorPai +
                '}';
    }
}