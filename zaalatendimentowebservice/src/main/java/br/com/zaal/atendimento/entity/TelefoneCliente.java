package br.com.zaal.atendimento.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "telefonecliente", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class TelefoneCliente implements Serializable {

    @Id
    private Long id;

    @Column(length = 150, nullable = false)
    private String descricao;

    @Column(length = 14, nullable = false)
    private String telefone;

    @Column(length = 4)
    private String ramal;

    @Column(nullable = false)
    private Boolean smscobranca;

    @ManyToOne
    @JoinColumn(name = "fkcliente", nullable = false)
    private Cliente cliente;

    public TelefoneCliente() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getRamal() {
        return ramal;
    }

    public void setRamal(String ramal) {
        this.ramal = ramal;
    }

    public Boolean getSmscobranca() {
        return smscobranca;
    }

    public void setSmscobranca(Boolean smscobranca) {
        this.smscobranca = smscobranca;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TelefoneCliente)) return false;
        TelefoneCliente that = (TelefoneCliente) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getDescricao(), that.getDescricao()) &&
                Objects.equals(getTelefone(), that.getTelefone()) &&
                Objects.equals(getRamal(), that.getRamal()) &&
                Objects.equals(getSmscobranca(), that.getSmscobranca()) &&
                Objects.equals(getCliente(), that.getCliente());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "TelefoneCliente{" +
                "id=" + id +
                ", descricao='" + descricao + '\'' +
                ", telefone='" + telefone + '\'' +
                ", ramal='" + ramal + '\'' +
                ", smscobranca=" + smscobranca +
                ", cliente=" + cliente +
                '}';
    }
}
