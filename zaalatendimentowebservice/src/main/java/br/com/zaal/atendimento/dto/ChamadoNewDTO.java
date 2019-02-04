package br.com.zaal.atendimento.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ChamadoNewDTO {

    @NotBlank
    @Size(min=5, max=150)
    private String solicitante;

    @NotNull
    private Long idCliente;

    @NotBlank
    @Size(min=5, max=250)
    private String assunto;

    @NotBlank
    @Email
    private String email;

    @NotNull
    private Long idMeio;

    @NotNull
    private Long idTipo;

    @NotNull
    private Long idPrioridade;

    @NotNull
    private Long idSistema;

    @NotBlank
    private String textoInterno;

    @NotBlank
    private String textoCliente;

    public ChamadoNewDTO(){
    }

    public String getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(String solicitante) {
        this.solicitante = solicitante;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public String getAssunto() {
        return assunto;
    }

    public void setAssunto(String assunto) {
        this.assunto = assunto;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getIdMeio() {
        return idMeio;
    }

    public void setIdMeio(Long idMeio) {
        this.idMeio = idMeio;
    }

    public Long getIdTipo() {
        return idTipo;
    }

    public void setIdTipo(Long idTipo) {
        this.idTipo = idTipo;
    }

    public Long getIdPrioridade() {
        return idPrioridade;
    }

    public void setIdPrioridade(Long idPrioridade) {
        this.idPrioridade = idPrioridade;
    }

    public Long getIdSistema() {
        return idSistema;
    }

    public void setIdSistema(Long idSistema) {
        this.idSistema = idSistema;
    }

    public String getTextoInterno() {
        return textoInterno;
    }

    public void setTextoInterno(String textoInterno) {
        this.textoInterno = textoInterno;
    }

    public String getTextoCliente() {
        return textoCliente;
    }

    public void setTextoCliente(String textoCliente) {
        this.textoCliente = textoCliente;
    }
}
