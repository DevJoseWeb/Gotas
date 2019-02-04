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
@Table(name = "cidade", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Cidade implements Serializable {

    @Id
    private Integer codigo;

    @Column(name="cidade", length = 40, nullable = false)
    private String nome;

    @Column(length = 2, nullable = false)
    private String uf;

    public Cidade() {};

    public Integer getCodigo() {
        return codigo;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Cidade)) return false;
        Cidade cidade1 = (Cidade) o;
        return Objects.equals(getCodigo(), cidade1.getCodigo()) &&
                Objects.equals(getNome(), cidade1.getNome()) &&
                Objects.equals(getUf(), cidade1.getUf());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCodigo(), getNome(), getUf());
    }

    @Override
    public String toString() {
        return "Cidade{" +
                "codigo=" + codigo +
                ", nome='" + nome + '\'' +
                ", uf='" + uf + '\'' +
                '}';
    }
}
