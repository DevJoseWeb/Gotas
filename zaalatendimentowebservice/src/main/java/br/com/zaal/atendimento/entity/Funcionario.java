package br.com.zaal.atendimento.entity;

import br.com.zaal.atendimento.entity.enums.EstadoCivil;
import br.com.zaal.atendimento.entity.enums.Sexo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "funcionario", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Funcionario implements Serializable {

    @Id
    private Long id;

    @Column(length = 150, nullable = false)
    private String nome;

    @Column(name = "datanascimento")
    private LocalDate dataNascimento;

    private String endereco;

    @ManyToOne
    @JoinColumn(name = "fkcidade")
    private Cidade cidade;

    @Column(length = 30)
    private String bairro;

    @Column(length = 9)
    private String cep;

    @Column(name = "estadocivil", length = 1)
    private String estadoCivil;

    @Column(length = 150)
    private String conjunge;

    @Column(length = 15)
    private String rg;

    @Column(length = 14)
    private String cpf;

    @Column(name = "carteiratrabalho", length = 10)
    private String carteiraTrabalho;

    @ManyToOne
    @JoinColumn(name = "fkfuncao")
    private Funcao funcao;

    @Column(name = "dataadmissao")
    private LocalDate dataAdmissao;

    private LocalDate registro;

    @Column(length = 255)
    private String email;

    @Column(length = 1)
    private String sexo;

    @Column(length = 30, nullable = false, unique = true)
    private String usuario;

    @JsonIgnore
    @Lob
    private byte[] foto;

    @Column(nullable = false)
    private boolean ativo;

    @Column(nullable = false)
    private boolean supervisor;

    @JsonIgnore
    @Column(length = 100, nullable = false)
    private String senha;

    private LocalDateTime atualizacao;

    @ManyToOne
    @JoinColumn(name = "fksetor", nullable = false)
    private Setor setor;

    public Funcionario() {}

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

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public Cidade getCidade() {
        return cidade;
    }

    public void setCidade(Cidade cidade) {
        this.cidade = cidade;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public EstadoCivil getEstadoCivil() {
        return EstadoCivil.parse(estadoCivil);
    }

    public void setEstadoCivil(EstadoCivil estadoCivil) {
        this.estadoCivil = estadoCivil.getDesc();
    }

    public String getConjunge() {
        return conjunge;
    }

    public void setConjunge(String conjunge) {
        this.conjunge = conjunge;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCarteiraTrabalho() {
        return carteiraTrabalho;
    }

    public void setCarteiraTrabalho(String carteiraTrabalho) {
        this.carteiraTrabalho = carteiraTrabalho;
    }

    public Funcao getFuncao() {
        return funcao;
    }

    public void setFuncao(Funcao funcao) {
        this.funcao = funcao;
    }

    public LocalDate getDataAdmissao() {
        return dataAdmissao;
    }

    public void setDataAdmissao(LocalDate dataAdmissao) {
        this.dataAdmissao = dataAdmissao;
    }

    public LocalDate getRegistro() {
        return registro;
    }

    public void setRegistro(LocalDate registro) {
        this.registro = registro;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Sexo getSexo() {
        return Sexo.parse(sexo);
    }

    public void setSexo(Sexo sexo) {
        this.sexo = sexo.getDesc();
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public byte[] getFoto() {
        return foto;
    }

    public void setFoto(byte[] foto) {
        this.foto = foto;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public boolean isSupervisor() {
        return supervisor;
    }

    public void setSupervisor(boolean supervisor) {
        this.supervisor = supervisor;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public LocalDateTime getAtualizacao() {
        return atualizacao;
    }

    public void setAtualizacao(LocalDateTime atualizacao) {
        this.atualizacao = atualizacao;
    }

    public Setor getSetor() {
        return setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Funcionario that = (Funcionario) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Funcionario{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", dataNascimento=" + dataNascimento +
                ", endereco='" + endereco + '\'' +
                ", cidade=" + cidade +
                ", bairro='" + bairro + '\'' +
                ", cep='" + cep + '\'' +
                ", estadoCivil=" + estadoCivil +
                ", conjunge='" + conjunge + '\'' +
                ", rg='" + rg + '\'' +
                ", cpf='" + cpf + '\'' +
                ", carteiraTrabalho='" + carteiraTrabalho + '\'' +
                ", funcao=" + funcao +
                ", dataAdmissao=" + dataAdmissao +
                ", registro=" + registro +
                ", email='" + email + '\'' +
                ", sexo=" + sexo +
                ", usuario='" + usuario + '\'' +
                ", foto=" + Arrays.toString(foto) +
                ", ativo=" + ativo +
                ", supervisor=" + supervisor +
                ", senha='" + senha + '\'' +
                ", atualizacao=" + atualizacao +
                ", setor=" + setor +
                '}';
    }
}