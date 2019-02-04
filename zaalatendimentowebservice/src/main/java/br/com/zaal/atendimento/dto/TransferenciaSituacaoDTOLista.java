package br.com.zaal.atendimento.dto;

import javax.validation.Valid;
import java.util.List;

public class TransferenciaSituacaoDTOLista {

    @Valid
    private List<TransferenciaSituacaoDTO> transferencias;

    public TransferenciaSituacaoDTOLista(){
    }

    public List<TransferenciaSituacaoDTO> getTransferencias() {
        return transferencias;
    }

    public void setTransferencias(List<TransferenciaSituacaoDTO> transferencias) {
        this.transferencias = transferencias;
    }
}
