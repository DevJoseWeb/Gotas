package br.com.zaal.atendimento.dto;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.List;

public class ChamadoUpdateDTOList {

    @Valid
    private List<ChamadoUpdateDTO> chamados;

    @NotEmpty
    private String justificativa;

    public ChamadoUpdateDTOList() {
    }

    public List<ChamadoUpdateDTO> getChamados() {
        return chamados;
    }

    public void setChamados(List<ChamadoUpdateDTO> chamados) {
        this.chamados = chamados;
    }

    public String getJustificativa() {
        return justificativa;
    }

    public void setJustificativa(String justificativa) {
        this.justificativa = justificativa;
    }
}
