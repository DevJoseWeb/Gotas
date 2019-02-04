package br.com.zaal.atendimento.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "atuacaochamado", schema = "public")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class AtuacaoChamado implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "datahora")
    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "fkfuncionario")
    private Funcionario funcionario;

    @ManyToOne
    @JoinColumn(name = "fksetor")
    private Setor setor;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "fkchamado")
    private Chamado chamado;

    public AtuacaoChamado() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public Setor getSetor() {
        return setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }

    public Chamado getChamado() {
        return chamado;
    }

    public void setChamado(Chamado chamado) {
        this.chamado = chamado;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AtuacaoChamado atuacaoChamado = (AtuacaoChamado) o;
        return Objects.equals(id, atuacaoChamado.id) &&
                Objects.equals(dataHora, atuacaoChamado.dataHora) &&
                Objects.equals(funcionario, atuacaoChamado.funcionario) &&
                Objects.equals(setor, atuacaoChamado.setor) &&
                Objects.equals(chamado, atuacaoChamado.chamado);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "AtuacaoChamado{" +
                "id=" + id +
                ", dataHora=" + dataHora +
                ", funcionario=" + funcionario +
                ", setor=" + setor +
                ", chamado=" + chamado +
                '}';
    }
}
