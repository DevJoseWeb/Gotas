package br.com.zaal.atendimento.dto;

import br.com.zaal.atendimento.entity.NotificacaoChamado;

import java.time.LocalDateTime;

public class NotificacaoChamadoDTO {

    private Long id;
    private boolean visualizado;
    private LocalDateTime dataHoraCriacao;
    private String nomeFuncionario;
    private String nome;
    private String descricao;
    private String texto;

    public NotificacaoChamadoDTO() {

    }

    public NotificacaoChamadoDTO(NotificacaoChamado notificacao) {
        this.id = notificacao.getId();
        this.visualizado = notificacao.isVisualizado();
        this.dataHoraCriacao = notificacao.getDataHoraCriacao();
        this.nomeFuncionario = notificacao.getFuncionarioRemetente().getNome();
        this.nome = notificacao.getTipo().getNome();
        this.descricao = notificacao.getTipo().getDescricao();
        this.texto = formatarTexto(notificacao.getTipo().getTexto(),
                                   notificacao.getFuncionarioRemetente().getNome(),
                                   notificacao.getChamado().getId().toString());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getNomeFuncionario() {
        return nomeFuncionario;
    }

    public void setNomeFuncionario(String nomeFuncionario) {
        this.nomeFuncionario = nomeFuncionario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    private String formatarTexto(String texto, String funcionario, String protocolo) {
        return texto.replace("${nomeFuncionario}", funcionario).replace("${protocolo}", protocolo);
    }

    @Override
    public String toString() {
        return "NotificacaoChamadoDTO{" +
                "id=" + id +
                ", visualizado=" + visualizado +
                ", dataHoraCriacao=" + dataHoraCriacao +
                ", nomeFuncionario='" + nomeFuncionario + '\'' +
                ", nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", texto='" + texto + '\'' +
                '}';
    }
}
