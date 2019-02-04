package br.com.zaal.atendimento.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "templateandamento", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class TemplateAndamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String texto;

    private Boolean ativo;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "fkcategoriatemplateandamento")
    private CategoriaTemplateAndamento categoriaTemplateAndamento;

    public TemplateAndamento() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public CategoriaTemplateAndamento getCategoriaTemplateAndamento() {
        return categoriaTemplateAndamento;
    }

    public void setCategoriaTemplateAndamento(CategoriaTemplateAndamento categoriaTemplateAndamento) {
        this.categoriaTemplateAndamento = categoriaTemplateAndamento;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TemplateAndamento that = (TemplateAndamento) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(texto, that.texto) &&
                Objects.equals(ativo, that.ativo) &&
                Objects.equals(categoriaTemplateAndamento, that.categoriaTemplateAndamento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, texto, ativo, categoriaTemplateAndamento);
    }

    @Override
    public String toString() {
        return "TemplateAndamento{" +
                "id=" + id +
                ", texto='" + texto + '\'' +
                ", ativo=" + ativo +
                ", categoriaTemplateAndamento=" + categoriaTemplateAndamento +
                '}';
    }
}
