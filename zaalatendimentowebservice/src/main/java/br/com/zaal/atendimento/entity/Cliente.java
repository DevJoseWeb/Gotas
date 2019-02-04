package br.com.zaal.atendimento.entity;

import br.com.zaal.atendimento.entity.enums.EstadoCivil;
import br.com.zaal.atendimento.entity.enums.Sexo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "cliente", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Cliente implements Serializable {

    @Id
    private Long id;

    @Column(name = "datacadastro")
    private LocalDateTime dataCadastro;

    @Column(name = "nomefantasia", length = 150)
    private String nomeFantasia;

    @Column(name = "razaosocial", length = 150)
    private String razaoSocial;

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

    private String complemento;

    @Column(length = 15)
    private String rg;

    @Column(length = 14)
    private String cpf;

    @Column(length = 18)
    private String cnpj;

    @Column(length = 1)
    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    @ManyToOne
    @JoinColumn(name = "fkgrupocliente")
    private GrupoCliente grupo;

    @Column(columnDefinition = "TEXT")
    private String observacao;

    @Column(name = "inscricaomunicipal", length = 15)
    private String inscricaoMunicipal;

    @Column(nullable = false)
    private boolean internet;

    @Column(length = 50)
    private String email;

    @Column(name = "numeroendereco")
    private Integer numeroEndereco;

    @Column(nullable = false)
    private boolean ativo;

    @Column(length = 1, name = "estadocivil")
    @Enumerated(EnumType.STRING)
    private EstadoCivil estadoCivil;

    @Column(length = 20)
    private String nacionalidade;

    @Column(length = 50)
    private String profissao;

    @Column(name = "dataatualizacao")
    private LocalDateTime dataAtualizacao;

    @Column(columnDefinition = "TEXT", name = "informacaoadicional")
    private String informacaoAdicional;

    @Column(name = "referenciaendereco")
    private String referenciaEndereco;

    @Column(length = 150, name = "nomepai")
    private String nomePai;

    @Column(length = 150, name = "nomemae")
    private String nomeMae;

    @OneToOne
    @JoinColumn(name = "fkcliente_contador")
    private Cliente clienteContador;

    @ManyToOne
    @JoinColumn(name = "fkramoatividade", nullable = false)
    private RamoAtividade ramoAtividade;

    @Column(name = "pendenciafinanceira", nullable = false)
    private boolean pendenciaFinanceira;

    public Cliente() {};

    public Cliente(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
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

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
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

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public Sexo getSexo() {
        return sexo;
    }

    public void setSexo(Sexo sexo) {
        this.sexo = sexo;
    }

    public GrupoCliente getGrupo() {
        return grupo;
    }

    public void setGrupo(GrupoCliente grupo) {
        this.grupo = grupo;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public String getInscricaoMunicipal() {
        return inscricaoMunicipal;
    }

    public void setInscricaoMunicipal(String inscricaoMunicipal) {
        this.inscricaoMunicipal = inscricaoMunicipal;
    }

    public boolean isInternet() {
        return internet;
    }

    public void setInternet(boolean internet) {
        this.internet = internet;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getNumeroEndereco() {
        return numeroEndereco;
    }

    public void setNumeroEndereco(Integer numeroEndereco) {
        this.numeroEndereco = numeroEndereco;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public EstadoCivil getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(EstadoCivil estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public String getProfissao() {
        return profissao;
    }

    public void setProfissao(String profissao) {
        this.profissao = profissao;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }

    public String getInformacaoAdicional() {
        return informacaoAdicional;
    }

    public void setInformacaoAdicional(String informacaoAdicional) {
        this.informacaoAdicional = informacaoAdicional;
    }

    public String getReferenciaEndereco() {
        return referenciaEndereco;
    }

    public void setReferenciaEndereco(String referenciaEndereco) {
        this.referenciaEndereco = referenciaEndereco;
    }

    public String getNomePai() {
        return nomePai;
    }

    public void setNomePai(String nomePai) {
        this.nomePai = nomePai;
    }

    public String getNomeMae() {
        return nomeMae;
    }

    public void setNomeMae(String nomeMae) {
        this.nomeMae = nomeMae;
    }

    public Cliente getClienteContador() {
        return clienteContador;
    }

    public void setClienteContador(Cliente clienteContador) {
        this.clienteContador = clienteContador;
    }

    public RamoAtividade getRamoAtividade() {
        return ramoAtividade;
    }

    public void setRamoAtividade(RamoAtividade ramoAtividade) {
        this.ramoAtividade = ramoAtividade;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Cliente)) return false;
        Cliente cliente = (Cliente) o;
        return isInternet() == cliente.isInternet() &&
                isAtivo() == cliente.isAtivo() &&
                Objects.equals(getId(), cliente.getId()) &&
                Objects.equals(getDataCadastro(), cliente.getDataCadastro()) &&
                Objects.equals(getNomeFantasia(), cliente.getNomeFantasia()) &&
                Objects.equals(getRazaoSocial(), cliente.getRazaoSocial()) &&
                Objects.equals(getDataNascimento(), cliente.getDataNascimento()) &&
                Objects.equals(getEndereco(), cliente.getEndereco()) &&
                Objects.equals(getCidade(), cliente.getCidade()) &&
                Objects.equals(getBairro(), cliente.getBairro()) &&
                Objects.equals(getCep(), cliente.getCep()) &&
                Objects.equals(getComplemento(), cliente.getComplemento()) &&
                Objects.equals(getRg(), cliente.getRg()) &&
                Objects.equals(getCpf(), cliente.getCpf()) &&
                Objects.equals(getCnpj(), cliente.getCnpj()) &&
                getSexo() == cliente.getSexo() &&
                Objects.equals(getGrupo(), cliente.getGrupo()) &&
                Objects.equals(getObservacao(), cliente.getObservacao()) &&
                Objects.equals(getInscricaoMunicipal(), cliente.getInscricaoMunicipal()) &&
                Objects.equals(getEmail(), cliente.getEmail()) &&
                Objects.equals(getNumeroEndereco(), cliente.getNumeroEndereco()) &&
                getEstadoCivil() == cliente.getEstadoCivil() &&
                Objects.equals(getNacionalidade(), cliente.getNacionalidade()) &&
                Objects.equals(getProfissao(), cliente.getProfissao()) &&
                Objects.equals(getDataAtualizacao(), cliente.getDataAtualizacao()) &&
                Objects.equals(getInformacaoAdicional(), cliente.getInformacaoAdicional()) &&
                Objects.equals(getReferenciaEndereco(), cliente.getReferenciaEndereco()) &&
                Objects.equals(getNomePai(), cliente.getNomePai()) &&
                Objects.equals(getNomeMae(), cliente.getNomeMae());
    }

    public boolean isPendenciaFinanceira() {
        return pendenciaFinanceira;
    }

    public void setPendenciaFinanceira(boolean pendenciaFinanceira) {
        this.pendenciaFinanceira = pendenciaFinanceira;
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "id=" + id +
                ", dataCadastro=" + dataCadastro +
                ", nomeFantasia='" + nomeFantasia + '\'' +
                ", razaoSocial='" + razaoSocial + '\'' +
                ", dataNascimento=" + dataNascimento +
                ", endereco='" + endereco + '\'' +
                ", cidade=" + cidade +
                ", bairro='" + bairro + '\'' +
                ", cep='" + cep + '\'' +
                ", complemento='" + complemento + '\'' +
                ", rg='" + rg + '\'' +
                ", cpf='" + cpf + '\'' +
                ", cnpj='" + cnpj + '\'' +
                ", sexo=" + sexo +
                ", grupo=" + grupo +
                ", observacao='" + observacao + '\'' +
                ", inscricaoMunicipal='" + inscricaoMunicipal + '\'' +
                ", internet=" + internet +
                ", email='" + email + '\'' +
                ", numeroEndereco=" + numeroEndereco +
                ", ativo=" + ativo +
                ", estadoCivil=" + estadoCivil +
                ", nacionalidade='" + nacionalidade + '\'' +
                ", profissao='" + profissao + '\'' +
                ", dataAtualizacao=" + dataAtualizacao +
                ", informacaoAdicional='" + informacaoAdicional + '\'' +
                ", referenciaEndereco='" + referenciaEndereco + '\'' +
                ", nomePai='" + nomePai + '\'' +
                ", nomeMae='" + nomeMae + '\'' +
                '}';
    }
}