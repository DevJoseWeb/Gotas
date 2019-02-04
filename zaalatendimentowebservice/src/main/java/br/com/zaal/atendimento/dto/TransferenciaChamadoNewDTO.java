package br.com.zaal.atendimento.dto;

import br.com.zaal.atendimento.service.validation.TransferenciaChamadoInsert;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@TransferenciaChamadoInsert
public class TransferenciaChamadoNewDTO {

    @NotNull
    private List<Long> chamados = new ArrayList<>();

    @NotNull
    private Long idFuncionarioDestino;

    @NotBlank
    private String justificativa;

    @NotNull
    private Long idStatus;

    public TransferenciaChamadoNewDTO() {
    }

    public List<Long> getChamados() {
        return chamados;
    }

    public void setChamados(List<Long> chamados) {
        this.chamados = chamados;
    }

    public Long getIdFuncionarioDestino() {
        return idFuncionarioDestino;
    }

    public void setIdFuncionarioDestino(Long idFuncionarioDestino) {
        this.idFuncionarioDestino = idFuncionarioDestino;
    }

    public String getJustificativa() {
        return justificativa;
    }

    public void setJustificativa(String justificativa) {
        this.justificativa = justificativa;
    }

    public Long getIdStatus() {
        return idStatus;
    }

    public void setIdStatus(Long idStatus) {
        this.idStatus = idStatus;
    }
}
