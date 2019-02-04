package br.com.zaal.atendimento.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class ChamadoUpdateDTO {

    @NotNull
    private Long id;
    private Long idMeio;
    private Long idTipo;

    @Email
    private String email;

    private Long idVersaoSistema;
    private Long idStatus;
    private Long idPrioridade;

    public ChamadoUpdateDTO() {
    }

    public Long getId() {
        return id;
    }

    public Long getIdMeio() {
        return idMeio;
    }

    public Long getIdTipo() {
        return idTipo;
    }

    public String getEmail() {
        return email;
    }

    public Long getIdVersaoSistema() {
        return idVersaoSistema;
    }

    public Long getIdStatus() {
        return idStatus;
    }

    public Long getIdPrioridade() {
        return idPrioridade;
    }
}