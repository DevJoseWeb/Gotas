package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.MeioChamado;
import br.com.zaal.atendimento.repository.MeioChamadoRepository;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeioChamadoService {

    private final MeioChamadoRepository repository;

    @Autowired
    public MeioChamadoService(MeioChamadoRepository repository) {
        this.repository = repository;
    }

    public MeioChamado findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Meio do Chamado não encontrado! Código: " + id));
    }

    public List<MeioChamado> findAll() {
        return repository.findAll();
    }

    public List<MeioChamado> findByNomeContainingIgnoreCaseOrderByNome(String nome) {
        return repository.findByNomeContainingIgnoreCaseOrderByNome(nome);
    }
}