package br.com.zaal.atendimento.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "notificacaochamado", schema = "public")
public class NotificacaoChamado implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fkfuncionario_remetente", nullable = false)
    private Funcionario funcionarioRemetente;

    @ManyToOne
    @JoinColumn(name = "fkfuncionario_destinatario", nullable = false)
    private Funcionario funcionarioDestinatario;

    @ManyToOne
    @JoinColumn(name = "fktiponotificacao", nullable = false)
    private TipoNotificacao tipo;

    @ManyToOne
    @JoinColumn(name = "fkchamado", nullable = false)
    private Chamado chamado;

    @Column(nullable = false)
    private boolean visualizado;

    @Column(name = "datahoracriacao", nullable = false)
    private LocalDateTime dataHoraCriacao;

    public NotificacaoChamado() {}

    public NotificacaoChamado(Funcionario funcionarioRemetente, Funcionario funcionarioDestinatario, TipoNotificacao tipo, Chamado chamado) {
        this.funcionarioRemetente = funcionarioRemetente;
        this.funcionarioDestinatario = funcionarioDestinatario;
        this.tipo = tipo;
        this.chamado = chamado;
        this.visualizado = false;
        this.dataHoraCriacao = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Funcionario getFuncionarioRemetente() {
        return funcionarioRemetente;
    }

    public void setFuncionarioRemetente(Funcionario funcionarioRemetente) {
        this.funcionarioRemetente = funcionarioRemetente;
    }

    public Funcionario getFuncionarioDestinatario() {
        return funcionarioDestinatario;
    }

    public void setFuncionarioDestinatario(Funcionario funcionarioDestinatario) {
        this.funcionarioDestinatario = funcionarioDestinatario;
    }

    public TipoNotificacao getTipo() {
        return tipo;
    }

    public void setTipo(TipoNotificacao tipo) {
        this.tipo = tipo;
    }

    public Chamado getChamado() {
        return chamado;
    }

    public void setChamado(Chamado chamado) {
        this.chamado = chamado;
    }

    public boolean isVisualizado() {
        return visualizado;
    }

    public void setVisualizado(boolean visualizado) {
        this.visualizado = visualizado;
    }

    public LocalDateTime getDataHoraCriacao() {
        return dataHoraCriacao;
    }

    public void setDataHoraCriacao(LocalDateTime dataHoraCriacao) {
        this.dataHoraCriacao = dataHoraCriacao;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NotificacaoChamado that = (NotificacaoChamado) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "NotificacaoChamado{" +
                "id=" + id +
                ", funcionarioRemetente=" + funcionarioRemetente +
                ", funcionarioDestinatario=" + funcionarioDestinatario +
                ", tipo=" + tipo +
                ", chamado=" + chamado +
                ", visualizado=" + visualizado +
                ", dataHoraCriacao=" + dataHoraCriacao +
                '}';
    }
}