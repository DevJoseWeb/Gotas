package br.com.zaal.atendimento.dto;


import java.time.LocalDateTime;

public class TransferenciaChamadoDTO {
    private Long id;
    private Long idChamado;
    private Long idcliente;
    private String nomeCliente;
    private LocalDateTime dataHoraEnvio;
    private String solicitante;
    private String assuntoChamado;
    private Long idFuncionarioEnvio;
    private String nomeFuncionarioEnvio;

    public TransferenciaChamadoDTO() {
    }

    public TransferenciaChamadoDTO(Long id, Long idChamado, Long idcliente, String nomeCliente, LocalDateTime dataHoraEnvio, String solicitante, String assuntoChamado, Long idFuncionarioEnvio, String nomeFuncionarioEnvio) {
        this.id = id;
        this.idChamado = idChamado;
        this.idcliente = idcliente;
        this.nomeCliente = nomeCliente;
        this.dataHoraEnvio = dataHoraEnvio;
        this.solicitante = solicitante;
        this.assuntoChamado = assuntoChamado;
        this.idFuncionarioEnvio = idFuncionarioEnvio;
        this.nomeFuncionarioEnvio = nomeFuncionarioEnvio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdChamado() {
        return idChamado;
    }

    public void setIdChamado(Long idChamado) {
        this.idChamado = idChamado;
    }

    public Long getIdcliente() {
        return idcliente;
    }

    public void setIdcliente(Long idcliente) {
        this.idcliente = idcliente;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public LocalDateTime getDataHoraEnvio() {
        return dataHoraEnvio;
    }

    public void setDataHoraEnvio(LocalDateTime dataHoraEnvio) {
        this.dataHoraEnvio = dataHoraEnvio;
    }

    public String getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(String solicitante) {
        this.solicitante = solicitante;
    }

    public String getAssuntoChamado() {
        return assuntoChamado;
    }

    public void setAssuntoChamado(String assuntoChamado) {
        this.assuntoChamado = assuntoChamado;
    }

    public Long getIdFuncionarioEnvio() {
        return idFuncionarioEnvio;
    }

    public void setIdFuncionarioEnvio(Long idFuncionarioEnvio) {
        this.idFuncionarioEnvio = idFuncionarioEnvio;
    }

    public String getNomeFuncionarioEnvio() {
        return nomeFuncionarioEnvio;
    }

    public void setNomeFuncionarioEnvio(String nomeFuncionarioEnvio) {
        this.nomeFuncionarioEnvio = nomeFuncionarioEnvio;
    }
}
