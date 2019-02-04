package br.com.zaal.atendimento.entity;

import br.com.zaal.atendimento.entity.enums.SituacaoTransferencia;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "transferenciachamado", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class TransferenciaChamado implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "fkchamado", nullable = false)
    private Chamado chamado;

    @ManyToOne
    @JoinColumn(name = "fkfuncionario_de", nullable = false)
    private Funcionario funcionarioDe;

    @ManyToOne
    @JoinColumn(name = "fkfuncionario_para", nullable = false)
    private Funcionario funcionarioPara;

    @Column(name = "datahoraenvio", nullable = false)
    private LocalDateTime dataHoraEnvio;

    @Column(name = "datahoraconclusao")
    private LocalDateTime dataHoraConclusao;

    @Column(nullable = false)
    @Enumerated
    private SituacaoTransferencia situacao;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String justificativa;

    public TransferenciaChamado() {
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

    public Funcionario getFuncionarioDe() {
        return funcionarioDe;
    }

    public void setFuncionarioDe(Funcionario funcionarioDe) {
        this.funcionarioDe = funcionarioDe;
    }

    public Funcionario getFuncionarioPara() {
        return funcionarioPara;
    }

    public void setFuncionarioPara(Funcionario funcionarioPara) {
        this.funcionarioPara = funcionarioPara;
    }

    public LocalDateTime getDataHoraEnvio() {
        return dataHoraEnvio;
    }

    public void setDataHoraEnvio(LocalDateTime dataHoraEnvio) {
        this.dataHoraEnvio = dataHoraEnvio;
    }

    public LocalDateTime getDataHoraConclusao() {
        return dataHoraConclusao;
    }

    public void setDataHoraConclusao(LocalDateTime dataHoraConclusao) {
        this.dataHoraConclusao = dataHoraConclusao;
    }

    public SituacaoTransferencia getSituacao() {
        return situacao;
    }

    public void setSituacao(SituacaoTransferencia situacao) {
        this.situacao = situacao;
    }

    public String getJustificativa() {
        return justificativa;
    }

    public void setJustificativa(String justificativa) {
        this.justificativa = justificativa;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TransferenciaChamado that = (TransferenciaChamado) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "TransferenciaChamado{" +
                "id=" + id +
                ", chamado=" + chamado +
                ", funcionarioDe=" + funcionarioDe +
                ", funcionarioPara=" + funcionarioPara +
                ", dataHoraEnvio=" + dataHoraEnvio +
                ", dataHoraConclusao=" + dataHoraConclusao +
                ", situacao=" + situacao +
                ", justificativa='" + justificativa + '\'' +
                '}';
    }
}