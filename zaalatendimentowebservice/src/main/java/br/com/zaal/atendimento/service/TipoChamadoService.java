package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.TipoChamado;
import br.com.zaal.atendimento.repository.TipoChamadoRepository;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoChamadoService {

    private final TipoChamadoRepository repository;

    @Autowired
    public TipoChamadoService(TipoChamadoRepository repository) {
        this.repository = repository;
    }

    public TipoChamado findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Tipo de Chamado não encontrado! Código: "+id));
    }

    public List<TipoChamado> findAll(Specification spec) {
        return repository.findAll(spec);
    }
}
