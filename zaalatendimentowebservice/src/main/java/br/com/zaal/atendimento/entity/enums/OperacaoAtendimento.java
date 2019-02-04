package br.com.zaal.atendimento.entity.enums;

public enum OperacaoAtendimento {

    PENDENTE(0L), EM_ANALISE(1L), ANDAMENTO(2L), PAUSA(3L), CONCLUSAO(4L), REINICIO(5L), CANCELADA(6L), PREVISAO(7L),
    ANEXO_ARQUIVO(8L), MODIFICACAO_CHAMADO(9L);

    private Long id;

    OperacaoAtendimento(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
