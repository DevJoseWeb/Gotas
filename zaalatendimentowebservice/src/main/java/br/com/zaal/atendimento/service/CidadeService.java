package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.Cidade;
import br.com.zaal.atendimento.repository.CidadeRepository;
import br.com.zaal.atendimento.service.exceptions.DataIntegrityException;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CidadeService {

    private final CidadeRepository repository;

    @Autowired
    public CidadeService(CidadeRepository repository) {
        this.repository = repository;
    }

    public Cidade findById(Integer id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Cidade não encontrada! Código: " + id));
    }

    public Cidade save(Cidade cidade) {
        return repository.save(cidade);
    }

    public void delete(Integer id) {
        findById(id);
        try {
            repository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não é possível excluir uma cidade com registros relacionados");
        }
    }

    public List<Cidade> findAll() {
        return repository.findAll();
    }

    public List<Cidade> findByNomeContainingIgnoreCaseOrderByNome(String nome) {
        return repository.findByNomeContainingIgnoreCaseOrderByNome(nome);
    }
}