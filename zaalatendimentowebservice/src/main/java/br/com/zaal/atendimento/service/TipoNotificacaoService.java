package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.TipoNotificacao;
import br.com.zaal.atendimento.repository.TipoNotificacaoRepository;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class TipoNotificacaoService {

    private final TipoNotificacaoRepository repository;

    public TipoNotificacaoService(TipoNotificacaoRepository repository) {
        this.repository = repository;
    }

    public TipoNotificacao buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Tipo de Notificação inexistente! Código: " + id));
    }
}
