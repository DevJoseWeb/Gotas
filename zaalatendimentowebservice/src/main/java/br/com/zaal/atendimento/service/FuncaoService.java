package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.Funcao;
import br.com.zaal.atendimento.repository.FuncaoRepository;
import br.com.zaal.atendimento.service.exceptions.DataIntegrityException;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class FuncaoService {

    private FuncaoRepository funcaoRepository;

    @Autowired
    public FuncaoService(FuncaoRepository funcaoRepository) {
        this.funcaoRepository = funcaoRepository;
    }

    public Funcao find(Long id) {
        return funcaoRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Função não encontrada! Código: " + id));
    }

    public Funcao save(Funcao funcao) {
        return funcaoRepository.save(funcao);
    }

    public void delete(Long id) {
        find(id);
        try {
            funcaoRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não é possível excluir uma função com funcionários");
        }
    }
}
