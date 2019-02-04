package br.com.zaal.atendimento.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "anexochamado", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class AnexoChamado implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255, nullable = false)
    private String nome;

    @Transient
    private String uri;

    @ManyToOne
    @JoinColumn(name = "fkchamado", nullable = false)
    private Chamado chamado;

    private LocalDateTime lancamento;

    public AnexoChamado() {}

    public AnexoChamado(String nome, Chamado chamado) {
        this.nome = nome;
        this.chamado = chamado;
        this.lancamento = LocalDateTime.now();
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

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public Chamado getChamado() {
        return chamado;
    }

    public void setChamado(Chamado chamado) {
        this.chamado = chamado;
    }

    public LocalDateTime getLancamento() {
        return lancamento;
    }

    public void setLancamento(LocalDateTime lancamento) {
        this.lancamento = lancamento;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AnexoChamado)) return false;
        AnexoChamado that = (AnexoChamado) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getNome(), that.getNome()) &&
                Objects.equals(getUri(), that.getUri()) &&
                Objects.equals(getChamado(), that.getChamado()) &&
                Objects.equals(getLancamento(), that.getLancamento());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "AnexoChamado{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", uri='" + uri + '\'' +
                ", chamado=" + chamado +
                ", lancamento=" + lancamento +
                '}';
    }
}