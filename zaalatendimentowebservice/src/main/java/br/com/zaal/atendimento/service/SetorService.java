package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.Setor;
import br.com.zaal.atendimento.repository.SetorRepository;
import br.com.zaal.atendimento.service.exceptions.DataIntegrityException;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SetorService {

    private final SetorRepository repository;

    @Autowired
    public SetorService(SetorRepository repository) {
        this.repository = repository;
    }

    public Setor findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Setor não encontrado! Código: " + id));
    }

    public Setor save(Setor setor) {
        Setor setorPai = null;
        if (setor.getSetorPai() != null) {
            setorPai = findById(setor.getSetorPai().getId());
        }
        setor.setSetorPai(setorPai);
        return repository.save(setor);
    }

    public void delete(Long id) {
        findById(id);
        try {
            repository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não é possível excluir um setor com funcionários ou setor filho");
        }
    }

    public List<Setor> findAll() {
        return repository.findAll();
    }

    public List<Setor> findByNomeContainingIgnoreCaseOrderByNome(String nome) {
        return repository.findByNomeContainingIgnoreCaseOrderByNome(nome);
    }
}