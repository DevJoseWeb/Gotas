package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.AndamentoChamado;
import br.com.zaal.atendimento.entity.enums.OperacaoAtendimento;
import br.com.zaal.atendimento.repository.AndamentoChamadoRepository;
import br.com.zaal.atendimento.repository.ChamadoRepository;
import br.com.zaal.atendimento.resource.util.Util;
import br.com.zaal.atendimento.service.exceptions.BadRequestException;
import br.com.zaal.atendimento.service.exceptions.UnprocessableEntityException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class AndamentoChamadoService {

    private final AndamentoChamadoRepository repository;
    private final ChamadoRepository chamadoRepository;
    private final NotificacaoChamadoService notificacaoService;

    @Autowired
    public AndamentoChamadoService(AndamentoChamadoRepository repository, ChamadoRepository chamadoRepository, NotificacaoChamadoService notificacaoService) {
        this.repository = repository;
        this.chamadoRepository = chamadoRepository;
        this.notificacaoService = notificacaoService;
    }

    public Page<AndamentoChamado> buscarAndamentosPorChamado(Long idChamado, Integer pagina, Integer itensPorPagina, String orderBy, String direcao) {
        PageRequest pageRequest = PageRequest.of(pagina, itensPorPagina, Sort.Direction.valueOf(direcao), orderBy);
        return repository.buscarAndamentosPorChamado(idChamado, pageRequest);
    }

    @Transactional
    public void save(AndamentoChamado andamento) {

        if (!Util.canUpdate(andamento.getChamado()) && (!andamento.getOperacao().getId().equals(OperacaoAtendimento.REINICIO.getId()))){
            throw new UnprocessableEntityException("Chamado concluído ou cancelado");
        }

        if (andamento.getOperacao().getId().equals(OperacaoAtendimento.PREVISAO.getId())) {
            if (andamento.getPrevisao() != null) {
                if (LocalDateTime.now().isAfter(andamento.getPrevisao()))
                    throw new BadRequestException("Data de Previsão inválida!");
            }
            else
                throw new BadRequestException("Data de Previsão é obrigatório!");
        }

        if (andamento.getTextoCliente() == null)
            throw new BadRequestException("Texto cliente é obrigatório!");

        andamento.setDataHora(LocalDateTime.now());
        andamento.setFuncionario(UserService.authenticated().getFuncionario());
        repository.save(andamento);

        andamento.getChamado().setDataHoraPrevisao(andamento.getPrevisao());
        andamento.getChamado().setOperacao(andamento.getOperacao());
        chamadoRepository.save(andamento.getChamado());

        notificacaoService.notificarAndamento(andamento.getChamado(), andamento.getOperacao());
    }
}