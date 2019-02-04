package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.Prioridade;
import br.com.zaal.atendimento.repository.PrioridadeRepository;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrioridadeService {

    private final PrioridadeRepository repository;

    @Autowired
    public PrioridadeService(PrioridadeRepository repository) {
        this.repository = repository;
    }

    public Prioridade findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Prioridade não encontrada! Código: " + id));
    }

    public List<Prioridade> findByNomeContainingIgnoreCaseOrderByNome(String nome) {
        return repository.findByNomeContainingIgnoreCaseOrderByNome(nome);
    }

    public List<Prioridade> findAll() {
        return repository.findAll();
    }
}