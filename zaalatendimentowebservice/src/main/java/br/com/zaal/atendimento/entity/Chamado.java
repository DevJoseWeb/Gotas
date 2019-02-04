package br.com.zaal.atendimento.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "chamado", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Chamado implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 150, nullable = false)
    private String solicitante;

    @ManyToOne
    @JoinColumn(name = "fkcliente", nullable = false)
    private Cliente cliente;

    @Column(name = "datahoraabertura", nullable = false)
    private LocalDateTime dataHoraAbertura;

    @Column(nullable = false)
    private String assunto;

    @ManyToOne
    @JoinColumn(name = "fkfuncionario_cadastro", nullable = false)
    private Funcionario funcionarioCadastro;

    @ManyToOne
    @JoinColumn(name = "fkfuncionario_responsavel", nullable = false)
    private Funcionario funcionarioResponsavel;

    @Column(name = "datahoraconclusao")
    private LocalDateTime dataHoraConclusao;

    @Column(nullable = false)
    private String email;

    @ManyToOne
    @JoinColumn(name = "fkoperacaoatendimento")
    private OperacaoAtendimento operacao;

    @Column(name = "datahoraprevisao")
    private LocalDateTime dataHoraPrevisao;

    private LocalDate limite;

    @ManyToOne
    @JoinColumn(name = "fkmeiochamado", nullable = false)
    private MeioChamado meio;

    @ManyToOne
    @JoinColumn(name = "fktipochamado", nullable = false)
    private TipoChamado tipo;

    @ManyToOne
    @JoinColumn(name = "fkversaosistema")
    private VersaoSistema versaoSistema;

    @ManyToOne
    @JoinColumn(name = "fkstatus")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "fkprioridade")
    private Prioridade prioridade;

    @ManyToOne
    @JoinColumn(name = "fksistema", nullable = false)
    private Sistema sistema;

    public Chamado() {};

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(String solicitante) {
        this.solicitante = solicitante;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public LocalDateTime getDataHoraAbertura() {
        return dataHoraAbertura;
    }

    public void setDataHoraAbertura(LocalDateTime dataHoraAbertura) {
        this.dataHoraAbertura = dataHoraAbertura;
    }

    public String getAssunto() {
        return assunto;
    }

    public void setAssunto(String assunto) {
        this.assunto = assunto;
    }

    public Funcionario getFuncionarioCadastro() {
        return funcionarioCadastro;
    }

    public void setFuncionarioCadastro(Funcionario funcionarioCadastro) {
        this.funcionarioCadastro = funcionarioCadastro;
    }

    public Funcionario getFuncionarioResponsavel() {
        return funcionarioResponsavel;
    }

    public void setFuncionarioResponsavel(Funcionario funcionarioResponsavel) {
        this.funcionarioResponsavel = funcionarioResponsavel;
    }

    public LocalDateTime getDataHoraConclusao() {
        return dataHoraConclusao;
    }

    public void setDataHoraConclusao(LocalDateTime dataHoraConclusao) {
        this.dataHoraConclusao = dataHoraConclusao;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public OperacaoAtendimento getOperacao() {
        return operacao;
    }

    public void setOperacao(OperacaoAtendimento operacao) {
        this.operacao = operacao;
    }

    public LocalDateTime getDataHoraPrevisao() {
        return dataHoraPrevisao;
    }

    public void setDataHoraPrevisao(LocalDateTime dataHoraPrevisao) {
        this.dataHoraPrevisao = dataHoraPrevisao;
    }

    public LocalDate getLimite() {
        return limite;
    }

    public void setLimite(LocalDate limite) {
        this.limite = limite;
    }

    public MeioChamado getMeio() {
        return meio;
    }

    public void setMeio(MeioChamado meio) {
        this.meio = meio;
    }

    public TipoChamado getTipo() {
        return tipo;
    }

    public void setTipo(TipoChamado tipo) {
        this.tipo = tipo;
    }

    public VersaoSistema getVersaoSistema() {
        return versaoSistema;
    }

    public void setVersaoSistema(VersaoSistema versaoSistema) {
        this.versaoSistema = versaoSistema;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Prioridade getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(Prioridade prioridade) {
        this.prioridade = prioridade;
    }

    public Sistema getSistema() {
        return sistema;
    }

    public void setSistema(Sistema sistema) {
        this.sistema = sistema;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chamado chamado = (Chamado) o;
        return Objects.equals(id, chamado.id) &&
                Objects.equals(solicitante, chamado.solicitante) &&
                Objects.equals(cliente, chamado.cliente) &&
                Objects.equals(dataHoraAbertura, chamado.dataHoraAbertura) &&
                Objects.equals(assunto, chamado.assunto) &&
                Objects.equals(funcionarioCadastro, chamado.funcionarioCadastro) &&
                Objects.equals(funcionarioResponsavel, chamado.funcionarioResponsavel) &&
                Objects.equals(dataHoraConclusao, chamado.dataHoraConclusao) &&
                Objects.equals(email, chamado.email) &&
                Objects.equals(operacao, chamado.operacao) &&
                Objects.equals(dataHoraPrevisao, chamado.dataHoraPrevisao) &&
                Objects.equals(limite, chamado.limite) &&
                Objects.equals(meio, chamado.meio) &&
                Objects.equals(tipo, chamado.tipo) &&
                Objects.equals(versaoSistema, chamado.versaoSistema) &&
                Objects.equals(status, chamado.status) &&
                Objects.equals(prioridade, chamado.prioridade) &&
                Objects.equals(sistema, chamado.sistema);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Chamado{" +
                "id=" + id +
                ", solicitante='" + solicitante + '\'' +
                ", cliente=" + cliente +
                ", dataHoraAbertura=" + dataHoraAbertura +
                ", assunto='" + assunto + '\'' +
                ", funcionarioCadastro=" + funcionarioCadastro +
                ", funcionarioResponsavel=" + funcionarioResponsavel +
                ", dataHoraConclusao=" + dataHoraConclusao +
                ", email='" + email + '\'' +
                ", operacao=" + operacao +
                ", dataHoraPrevisao=" + dataHoraPrevisao +
                ", limite=" + limite +
                ", meio=" + meio +
                ", tipo=" + tipo +
                ", versaoSistema=" + versaoSistema +
                ", status=" + status +
                ", prioridade=" + prioridade +
                ", sistema=" + sistema +
                '}';
    }
}