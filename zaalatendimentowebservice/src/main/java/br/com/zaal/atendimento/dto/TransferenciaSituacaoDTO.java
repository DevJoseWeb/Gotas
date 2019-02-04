package br.com.zaal.atendimento.dto;

import br.com.zaal.atendimento.entity.enums.SituacaoTransferencia;
import br.com.zaal.atendimento.service.validation.TransferenciaChamadoSituacao;

import javax.validation.constraints.NotNull;

@TransferenciaChamadoSituacao
public class TransferenciaSituacaoDTO {

    @NotNull
    private Long idTransferencia;

    @NotNull
    private SituacaoTransferencia situacao;

    private String justificativa;

    public TransferenciaSituacaoDTO() {
    }

    public Long getIdTransferencia() {
        return idTransferencia;
    }

    public void setIdTransferencia(Long idTransferencia) {
        this.idTransferencia = idTransferencia;
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
}
