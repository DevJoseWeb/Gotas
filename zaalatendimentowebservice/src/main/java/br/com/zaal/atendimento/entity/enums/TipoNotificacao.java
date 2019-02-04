package br.com.zaal.atendimento.entity.enums;

public enum TipoNotificacao {

    ANDAMENTO(1L), TRANSFERENCIA(2L), TRANSFERENCIA_ACEITO(3L), TRANSFERENCIA_RECUSADO(4L), MODIFICACAO_CHAMADO(5L), ANEXO_CHAMADO(6L);

    private Long id;

    TipoNotificacao(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}