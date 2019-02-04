package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.dto.NotificacaoChamadoDTO;
import br.com.zaal.atendimento.entity.*;
import br.com.zaal.atendimento.entity.enums.TipoNotificacao;
import br.com.zaal.atendimento.repository.NotificacaoChamadoRepository;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificacaoChamadoService {

    private final NotificacaoChamadoRepository repository;
    private final TipoNotificacaoService tipoNotificacaoService;
    private final FeedbackService feedbackService;

    @Autowired
    public NotificacaoChamadoService(NotificacaoChamadoRepository repository, TipoNotificacaoService tipoNotificacaoService, FeedbackService feedbackService) {
        this.repository = repository;
        this.tipoNotificacaoService = tipoNotificacaoService;
        this.feedbackService = feedbackService;
    }

    public NotificacaoChamado buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Notificação não encontrada! Código: " + id));
    }

    public NotificacaoChamadoDTO visualizar(Long id) {
        NotificacaoChamado notificacao = buscarPorId(id);
        notificacao.setVisualizado(true);
        repository.save(notificacao);
        return new NotificacaoChamadoDTO(notificacao);
    }

    public List<NotificacaoChamadoDTO> buscarTodos(Funcionario funcionario) {
        return repository.findAllByFuncionarioDestinatarioOrderByIdDesc(funcionario).stream().map(NotificacaoChamadoDTO::new).collect(Collectors.toList());
    }

    private void gravar(List<NotificacaoChamado> notificacoes) {
        if (!notificacoes.isEmpty())
            repository.saveAll(notificacoes);
    }

    public void notificarAndamento(Chamado chamado, OperacaoAtendimento operacao) {
        Funcionario user = UserService.authenticated().getFuncionario();
        List<NotificacaoChamado> notificacoes;

        if (operacao.getId().equals(br.com.zaal.atendimento.entity.enums.OperacaoAtendimento.ANEXO_ARQUIVO.getId())) {
            notificacoes = buscarNotificacoesFeedback(chamado, TipoNotificacao.ANEXO_CHAMADO, user);
        }
        else if (operacao.getId().equals(br.com.zaal.atendimento.entity.enums.OperacaoAtendimento.MODIFICACAO_CHAMADO.getId())) {
            notificacoes = buscarNotificacoesFeedback(chamado, TipoNotificacao.MODIFICACAO_CHAMADO, user);
        }
        else {
            notificacoes = buscarNotificacoesFeedback(chamado, TipoNotificacao.ANDAMENTO, user);
        }
        gravar(notificacoes);
    }

    public void notificarTransferencia(List<TransferenciaChamado> transferencias) {
        List<NotificacaoChamado> notificacoes = new ArrayList<>();
        for (TransferenciaChamado transferencia : transferencias) {
            switch (transferencia.getSituacao()) {
                case PENDENTE: {
                    notificacoes.add(new NotificacaoChamado(transferencia.getFuncionarioDe(), transferencia.getFuncionarioPara(), tipoNotificacaoService.buscarPorId(TipoNotificacao.TRANSFERENCIA.getId()), transferencia.getChamado()));
                    break;
                }
                case ACEITO: {
                    notificacoes.addAll(buscarNotificacoesFeedback(transferencia.getChamado(), TipoNotificacao.TRANSFERENCIA_ACEITO, transferencia.getFuncionarioPara()));
                    break;
                }
                case RECUSADO: {
                    notificacoes.add(new NotificacaoChamado(transferencia.getFuncionarioPara(), transferencia.getFuncionarioDe(), tipoNotificacaoService.buscarPorId(TipoNotificacao.TRANSFERENCIA_RECUSADO.getId()), transferencia.getChamado()));
                    break;
                }
            }
        }
        gravar(notificacoes);
    }

    private List<NotificacaoChamado> buscarNotificacoesFeedback(Chamado chamado, TipoNotificacao tipoNotificacao, Funcionario user) {
        List<NotificacaoChamado> notificacoes = new ArrayList<>();
        List<Feedback> feedbacks = feedbackService.buscarFeedbackPorChamado(chamado.getId());

        br.com.zaal.atendimento.entity.TipoNotificacao tipoNotificacao1 = new br.com.zaal.atendimento.entity.TipoNotificacao(tipoNotificacao.getId());

        feedbacks.forEach(
                feedback -> {
                    if (!user.equals(feedback.getFuncionario()))
                        notificacoes.add(new NotificacaoChamado(user, feedback.getFuncionario(), tipoNotificacao1, chamado));
                });
        return notificacoes;
    }
}