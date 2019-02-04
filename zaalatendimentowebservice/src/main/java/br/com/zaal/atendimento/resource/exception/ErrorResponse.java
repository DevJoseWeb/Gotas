package br.com.zaal.atendimento.resource.exception;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse implements Serializable {

    private Long timestamp;
    private Integer Status;
    private String erro;
    private String message;
    private String path;
    private List<FieldMessage> erros;

    public ErrorResponse(Long timestamp, Integer status, String erro, String message, String path) {
        this.timestamp = timestamp;
        Status = status;
        this.erro = erro;
        this.message = message;
        this.path = path;
    }

    public ErrorResponse(Long timestamp, Integer status, String erro, String message, String path, List<FieldMessage> erros) {
        this.timestamp = timestamp;
        Status = status;
        this.erro = erro;
        this.message = message;
        this.path = path;
        this.erros = erros;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getStatus() {
        return Status;
    }

    public void setStatus(Integer status) {
        Status = status;
    }

    public String getErro() {
        return erro;
    }

    public void setErro(String erro) {
        this.erro = erro;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public List<FieldMessage> getErros() {
        return erros;
    }

    public void setErros(List<FieldMessage> erros) {
        this.erros = erros;
    }
}