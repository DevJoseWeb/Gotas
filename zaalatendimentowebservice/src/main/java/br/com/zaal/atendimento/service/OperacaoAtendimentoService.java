package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.OperacaoAtendimento;
import br.com.zaal.atendimento.repository.OperacaoAtendimentoRepository;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OperacaoAtendimentoService {

    private final OperacaoAtendimentoRepository repository;

    @Autowired
    public OperacaoAtendimentoService(OperacaoAtendimentoRepository repository) {
        this.repository = repository;
    }

    public OperacaoAtendimento findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Operação não encontrada! Código: " + id));
    }

    public List<OperacaoAtendimento> findAll() {
        return repository.findAll();
    }

    public List<OperacaoAtendimento> findAllByNomeContainingIgnoreCaseOrderByNome(String nome) {
        return repository.findAllByNomeContainingIgnoreCaseOrderByNome(nome);
    }
}