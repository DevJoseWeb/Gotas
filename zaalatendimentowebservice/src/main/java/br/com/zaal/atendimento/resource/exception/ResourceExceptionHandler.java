package br.com.zaal.atendimento.resource.exception;

import br.com.zaal.atendimento.service.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class ResourceExceptionHandler {

    @ExceptionHandler(ObjectNotFoundException.class)
    public ResponseEntity<ErrorResponse> objectNotFound(ObjectNotFoundException e, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(System.currentTimeMillis(), HttpStatus.NOT_FOUND.value(), "Não encontrado", e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }
    
    @ExceptionHandler(UnprocessableEntityException.class)
    public ResponseEntity<ErrorResponse> unprocessableEntity(UnprocessableEntityException e, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(System.currentTimeMillis(), HttpStatus.UNPROCESSABLE_ENTITY.value(), "Entidade não processável", e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(errorResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> validation(MethodArgumentNotValidException e, HttpServletRequest request) {
        List<FieldMessage> erros = e.getBindingResult().getFieldErrors().stream().map(obj -> new FieldMessage(obj.getField(), obj.getDefaultMessage())).collect(Collectors.toList());
        ErrorResponse errorResponse = new ErrorResponse(System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value(), "Inválido", e.getMessage(), request.getRequestURI(), erros);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ErrorResponse> validation(ConflictException e, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(System.currentTimeMillis(), HttpStatus.CONFLICT.value(), "Registro duplicado", e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> validation(BadRequestException e, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value(), "BAD REQUEST", e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(NotAcceptableStatusException.class)
    public ResponseEntity<ErrorResponse> validation(NotAcceptableStatusException e, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(System.currentTimeMillis(), HttpStatus.NOT_ACCEPTABLE.value(), "Não aceitável", e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(errorResponse);
    }

    @ExceptionHandler(DataIntegrityException.class)
    public ResponseEntity<ErrorResponse> objectIntegrity(DataIntegrityException e, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value(), "Integridade de dados", e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }
}
