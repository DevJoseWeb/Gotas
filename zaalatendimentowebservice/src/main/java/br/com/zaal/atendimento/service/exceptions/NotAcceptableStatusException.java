package br.com.zaal.atendimento.service.exceptions;

public class NotAcceptableStatusException extends RuntimeException {

    public NotAcceptableStatusException(String message) {
        super(message);
    }

    public NotAcceptableStatusException(String message, Throwable cause) {
        super(message, cause);
    }
}
