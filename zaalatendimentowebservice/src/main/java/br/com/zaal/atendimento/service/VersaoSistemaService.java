package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.VersaoSistema;
import br.com.zaal.atendimento.repository.VersaoSistemaRepository;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VersaoSistemaService {

    private final VersaoSistemaRepository repository;

    @Autowired
    public VersaoSistemaService(VersaoSistemaRepository repository) {
        this.repository = repository;
    }

    public VersaoSistema findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Versão do Sistema não encontrado! Código: " + id));
    }

    public List<VersaoSistema> findAll() {
        return repository.findAll();
    }

    public List<VersaoSistema> findByNomeContainingIgnoreCaseOrderByNome(String nome) {
        return repository.findByNomeContainingIgnoreCaseOrderByNome(nome);
    }
}