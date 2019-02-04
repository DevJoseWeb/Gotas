package br.com.zaal.atendimento.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "grupocliente")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class GrupoCliente implements Serializable {

    @Id
    private Long id;

    @Column(length = 150, nullable = false, unique = true)
    private String nome;

    @Column(length = 100)
    private String email;

    @OneToOne
    @JoinColumn(name = "fkcliente_central")
    private Cliente clienteCentral;

    public GrupoCliente() {}

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Cliente getClienteCentral() {
        return clienteCentral;
    }

    public void setClienteCentral(Cliente clienteCentral) {
        this.clienteCentral = clienteCentral;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GrupoCliente)) return false;
        GrupoCliente that = (GrupoCliente) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getNome(), that.getNome()) &&
                Objects.equals(getEmail(), that.getEmail()) &&
                Objects.equals(getClienteCentral(), that.getClienteCentral());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "GrupoCliente{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", cliente=" + clienteCentral +
                '}';
    }
}
