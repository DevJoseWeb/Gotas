package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.Sistema;
import br.com.zaal.atendimento.repository.SistemaRepository;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SistemaService {

    private final SistemaRepository repository;

    @Autowired
    public SistemaService(SistemaRepository repository) {
        this.repository = repository;
    }

    public Sistema findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Sistema não encontrado! Código: " + id));
    }

    public List<Sistema> findAll() {
        return repository.findAll();
    }

    public List<Sistema> findByNomeContainingIgnoreCaseOrderByNome(String nome) {
        return repository.findByNomeContainingIgnoreCaseOrderByNome(nome);
    }
}