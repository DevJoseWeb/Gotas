package br.com.zaal.atendimento.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "andamentochamado", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class AndamentoChamado implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "fkchamado", nullable = false)
    private Chamado chamado;

    @Column(nullable = false, name = "datahora")
    private LocalDateTime dataHora;

    @Column(name = "enviaemail", nullable = false)
    private boolean enviaEmail;

    @Column(name = "textocliente", columnDefinition = "TEXT", nullable = false)
    private String textoCliente;

    @Column(name = "textointerno", columnDefinition = "TEXT")
    private String textoInterno;

    @ManyToOne
    @JoinColumn(name = "fkoperacaoatendimento", nullable = false)
    private OperacaoAtendimento operacao;

    @ManyToOne
    @JoinColumn(name = "fkfuncionario", nullable = false)
    private Funcionario funcionario;

    @ManyToOne
    @JoinColumn(name = "fklocalizacao")
    private Localizacao localizacao;

    @ManyToOne
    @JoinColumn(name = "fktemplateandamento")
    private TemplateAndamento templateAndamento;

    @Transient
    private LocalDateTime previsao;

    public AndamentoChamado() {};

    public AndamentoChamado(Chamado chamado, String textoCliente, String textoInterno, OperacaoAtendimento operacao) {
        this.chamado = chamado;
        this.textoCliente = textoCliente;
        this.textoInterno = textoInterno;
        this.operacao = operacao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Chamado getChamado() {
        return chamado;
    }

    public void setChamado(Chamado chamado) {
        this.chamado = chamado;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public boolean isEnviaEmail() {
        return enviaEmail;
    }

    public void setEnviaEmail(boolean enviaEmail) {
        this.enviaEmail = enviaEmail;
    }

    public String getTextoCliente() {
        return textoCliente;
    }

    public void setTextoCliente(String textoCliente) {
        this.textoCliente = textoCliente;
    }

    public String getTextoInterno() {
        return textoInterno;
    }

    public void setTextoInterno(String textoInterno) {
        this.textoInterno = textoInterno;
    }

    public OperacaoAtendimento getOperacao() {
        return operacao;
    }

    public void setOperacao(OperacaoAtendimento operacao) {
        this.operacao = operacao;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public Localizacao getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(Localizacao localizacao) {
        this.localizacao = localizacao;
    }

    public TemplateAndamento getTemplateAndamento() {
        return templateAndamento;
    }

    public void setTemplateAndamento(TemplateAndamento templateAndamento) {
        this.templateAndamento = templateAndamento;
    }

    public LocalDateTime getPrevisao() {
        return previsao;
    }

    public void setPrevisao(LocalDateTime previsao) {
        this.previsao = previsao;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AndamentoChamado)) return false;
        AndamentoChamado that = (AndamentoChamado) o;
        return isEnviaEmail() == that.isEnviaEmail() &&
                Objects.equals(getId(), that.getId()) &&
                Objects.equals(getChamado(), that.getChamado()) &&
                Objects.equals(getDataHora(), that.getDataHora()) &&
                Objects.equals(getTextoCliente(), that.getTextoCliente()) &&
                Objects.equals(getTextoInterno(), that.getTextoInterno()) &&
                Objects.equals(getOperacao(), that.getOperacao()) &&
                Objects.equals(getFuncionario(), that.getFuncionario()) &&
                Objects.equals(getLocalizacao(), that.getLocalizacao()) &&
                Objects.equals(getTemplateAndamento(), that.getTemplateAndamento());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "AndamentoChamado{" +
                "id=" + id +
                ", chamado=" + chamado +
                ", dataHora=" + dataHora +
                ", enviaEmail=" + enviaEmail +
                ", textoCliente='" + textoCliente + '\'' +
                ", textoInterno='" + textoInterno + '\'' +
                ", operacao=" + operacao +
                ", funcionario=" + funcionario +
                ", localizacao=" + localizacao +
                ", templateAndamento=" + templateAndamento +
                '}';
    }
}
