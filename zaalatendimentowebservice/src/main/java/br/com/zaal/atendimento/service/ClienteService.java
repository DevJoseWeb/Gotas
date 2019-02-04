package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.Cliente;
import br.com.zaal.atendimento.repository.ClienteRepository;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public Cliente findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Cliente não encontrado! Código: " + id));
    }

    public List<Cliente> findAll() {
        return repository.findAll();
    }

    public List<Cliente> findAll(Specification specification) {
        return repository.findAll(specification);
    }
}