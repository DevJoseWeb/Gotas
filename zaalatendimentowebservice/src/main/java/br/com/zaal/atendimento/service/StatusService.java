package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.Status;
import br.com.zaal.atendimento.repository.StatusRepository;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusService {

    private final StatusRepository repository;

    @Autowired
    public StatusService(StatusRepository repository) {
        this.repository = repository;
    }

    public Status findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Status não encontrado! Código: " + id));
    }

    public List<Status> findAll() {
        return repository.findAll();
    }

    public List<Status> findByNome(String nome) {
        return repository.findByNomeContainsIgnoreCaseOrderByNome(nome);
    }

}
