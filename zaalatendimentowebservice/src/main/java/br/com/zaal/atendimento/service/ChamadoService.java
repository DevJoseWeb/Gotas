package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.dto.ChamadoNewDTO;
import br.com.zaal.atendimento.dto.ChamadoUpdateDTOList;
import br.com.zaal.atendimento.entity.*;
import br.com.zaal.atendimento.repository.ChamadoRepository;
import br.com.zaal.atendimento.resource.util.Util;
import br.com.zaal.atendimento.service.exceptions.BadRequestException;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import br.com.zaal.atendimento.service.exceptions.UnprocessableEntityException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChamadoService {

    private final ChamadoRepository repository;
    private final AndamentoChamadoService andamentoChamadoService;
    private final MeioChamadoService meioChamadoService;
    private final TipoChamadoService tipoChamadoService;
    private final VersaoSistemaService versaoSistemaService;
    private final StatusService statusService;
    private final PrioridadeService prioridadeService;

    @Autowired
    public ChamadoService(ChamadoRepository repository, AndamentoChamadoService andamentoChamadoService, MeioChamadoService meioChamadoService, TipoChamadoService tipoChamadoService, VersaoSistemaService versaoSistemaService, StatusService statusService, PrioridadeService prioridadeService) {
        this.repository = repository;
        this.andamentoChamadoService = andamentoChamadoService;
        this.meioChamadoService = meioChamadoService;
        this.tipoChamadoService = tipoChamadoService;
        this.versaoSistemaService = versaoSistemaService;
        this.statusService = statusService;
        this.prioridadeService = prioridadeService;
    }

    public Page<Chamado> findAll(Specification<Chamado> specification, Integer pagina, Integer itensPorPagina, String orderBy, String direcao) {
        PageRequest pageRequest = PageRequest.of(pagina, itensPorPagina, Direction.valueOf(direcao), orderBy);
        return repository.findAll(specification, pageRequest);
    }

    @Transactional
    public Long insert(ChamadoNewDTO chamadoDto) {
        Chamado chamado = fromDTO(chamadoDto);
        chamado.setFuncionarioCadastro(UserService.authenticated().getFuncionario());
        chamado.setDataHoraAbertura(LocalDateTime.now());
        chamado.setFuncionarioResponsavel(chamado.getFuncionarioCadastro());

        chamado = save(chamado);

        AndamentoChamado andamento = new AndamentoChamado();
        andamento.setTextoCliente(chamadoDto.getTextoCliente());
        andamento.setTextoInterno(chamadoDto.getTextoInterno());
        andamento.setChamado(chamado);
        andamento.setFuncionario(chamado.getFuncionarioCadastro());
        andamento.setOperacao(new OperacaoAtendimento(br.com.zaal.atendimento.entity.enums.OperacaoAtendimento.EM_ANALISE.getId()));

        andamentoChamadoService.save(andamento);

        return chamado.getId();
    }

    public Chamado save(Chamado chamado) {
        if ((chamado.getId() != null) && !Util.canUpdate(chamado)){
            throw new UnprocessableEntityException("Chamado concluído ou cancelado");
        }

        return repository.save(chamado);
    }

    public Chamado findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Chamado não encontrado! Protocolo: " + id));
    }
    
    public Chamado fromDTO (ChamadoNewDTO dto){
        Chamado chamado = new Chamado();
        chamado.setSolicitante(dto.getSolicitante());
        chamado.setCliente(new Cliente(dto.getIdCliente()));
        chamado.setAssunto(dto.getAssunto());
        chamado.setEmail(dto.getEmail());
        chamado.setMeio(new MeioChamado(dto.getIdMeio()));
        chamado.setTipo(new TipoChamado(dto.getIdTipo()));
        chamado.setPrioridade(new Prioridade(dto.getIdPrioridade()));
        chamado.setSistema(new Sistema(dto.getIdSistema()));
        return chamado;
    }

    @Transactional
    public void atualizarChamado(ChamadoUpdateDTOList chamadosDto) {
        List<Chamado> chamados = new ArrayList<>();

        chamadosDto.getChamados().forEach( dto -> {
            Chamado chamado = findById(dto.getId());
            if (Util.canUpdate(chamado)) {
                if (dto.getIdTipo() == null && dto.getIdStatus() == null && dto.getIdPrioridade() == null &&
                        dto.getIdMeio() == null && dto.getEmail() == null && dto.getIdVersaoSistema() == null) {
                    throw new BadRequestException("Json não possui atributos para alteração!");
                }

                if (dto.getIdTipo() != null) {
                    chamado.setTipo(tipoChamadoService.findById(dto.getIdTipo()));
                }

                if (dto.getIdStatus() != null) {
                    chamado.setStatus(statusService.findById(dto.getIdStatus()));
                }

                if (dto.getIdPrioridade() != null) {
                    chamado.setPrioridade(prioridadeService.findById(dto.getIdPrioridade()));
                }

                if (dto.getIdMeio() != null) {
                    chamado.setMeio(meioChamadoService.findById(dto.getIdMeio()));
                }

                if (dto.getEmail() != null) {
                    chamado.setEmail(dto.getEmail());
                }

                if (dto.getIdVersaoSistema() != null) {
                    chamado.setVersaoSistema(versaoSistemaService.findById(dto.getIdVersaoSistema()));
                }

                chamados.add(chamado);
            }
            else{
                throw new UnprocessableEntityException("Chamado concluído. ID: "+ chamado.getId());
            }
        });

        repository.saveAll(chamados);
    }
}