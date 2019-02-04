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
@Table(name = "sistema", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Sistema implements Serializable {

    @Id
    private Long id;

    @Column(length = 150, nullable = false, unique = true)
    private String nome;

    @Column(nullable = false)
    private boolean ativo;

    private Integer ponto;

    @Column(length = 40, name = "nomeabreviado")
    private String nomeAbreviado;

    @Column(nullable = false)
    private boolean movel;

    @Column(columnDefinition = "TEXT")
    private String sobre;

    @Column(nullable = false, name = "recebeatendimento")
    private boolean recebeAtendimento;

    public Sistema() {}

    public Sistema(Long id) {
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

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public Integer getPonto() {
        return ponto;
    }

    public void setPonto(Integer ponto) {
        this.ponto = ponto;
    }

    public boolean isMovel() {
        return movel;
    }

    public void setMovel(boolean movel) {
        this.movel = movel;
    }

    public String getSobre() {
        return sobre;
    }

    public void setSobre(String sobre) {
        this.sobre = sobre;
    }

    public String getNomeAbreviado() {
        return nomeAbreviado;
    }

    public void setNomeAbreviado(String nomeAbreviado) {
        this.nomeAbreviado = nomeAbreviado;
    }

    public boolean isRecebeAtendimento() {
        return recebeAtendimento;
    }

    public void setRecebeAtendimento(boolean recebeAtendimento) {
        this.recebeAtendimento = recebeAtendimento;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sistema sistema = (Sistema) o;
        return ativo == sistema.ativo &&
                movel == sistema.movel &&
                recebeAtendimento == sistema.recebeAtendimento &&
                Objects.equals(id, sistema.id) &&
                Objects.equals(nome, sistema.nome) &&
                Objects.equals(ponto, sistema.ponto) &&
                Objects.equals(nomeAbreviado, sistema.nomeAbreviado) &&
                Objects.equals(sobre, sistema.sobre);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Sistema{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", ativo=" + ativo +
                ", ponto=" + ponto +
                ", movel=" + movel +
                ", sobre='" + sobre + '\'' +
                '}';
    }
}