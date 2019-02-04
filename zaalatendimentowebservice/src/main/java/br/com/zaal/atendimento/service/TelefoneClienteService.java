package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.Cliente;
import br.com.zaal.atendimento.entity.TelefoneCliente;
import br.com.zaal.atendimento.repository.TelefoneClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TelefoneClienteService {

    private final TelefoneClienteRepository repository;

    @Autowired
    public TelefoneClienteService(TelefoneClienteRepository repository) {
        this.repository = repository;
    }

    public List<TelefoneCliente> findAllByClienteOrderById(Cliente cliente) {
        return repository.findAllByClienteOrderById(cliente);
    }
}
