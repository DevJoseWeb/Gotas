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
@Table(name = "filial", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Filial implements Serializable {
    
    @Id
    private Long id;

    @Column(name = "razaosocial", length = 150, nullable = false)
    private String razaoSocial;

    @Column(name = "nomefantasia", length = 150)
    private String nomeFantasia;

    @Column(length = 18)
    private String cnpj;

    @Column(name = "inscricaoestadual", length = 15)
    private String inscricaoEstadual;

    @Column(name = "inscricaomunicipal", length = 15)
    private String inscricaoMunicipal;

    public Filial() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Filial)) return false;
        Filial filial = (Filial) o;
        return Objects.equals(getId(), filial.getId()) &&
                Objects.equals(getRazaoSocial(), filial.getRazaoSocial()) &&
                Objects.equals(getNomeFantasia(), filial.getNomeFantasia());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getRazaoSocial(), getNomeFantasia());
    }

    @Override
    public String toString() {
        return "Filial{" +
                "id=" + id +
                ", razaoSocial='" + razaoSocial + '\'' +
                ", nomeFantasia='" + nomeFantasia + '\'' +
                '}';
    }
}
