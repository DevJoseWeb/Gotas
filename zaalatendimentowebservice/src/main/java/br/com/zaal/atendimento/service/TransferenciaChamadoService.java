package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.dto.TransferenciaChamadoDTO;
import br.com.zaal.atendimento.dto.TransferenciaChamadoNewDTO;
import br.com.zaal.atendimento.dto.TransferenciaSituacaoDTO;
import br.com.zaal.atendimento.entity.Chamado;
import br.com.zaal.atendimento.entity.Funcionario;
import br.com.zaal.atendimento.entity.Status;
import br.com.zaal.atendimento.entity.TransferenciaChamado;
import br.com.zaal.atendimento.entity.enums.SituacaoTransferencia;
import br.com.zaal.atendimento.repository.ChamadoRepository;
import br.com.zaal.atendimento.repository.TransferenciaChamadoRepository;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TransferenciaChamadoService {

    private final TransferenciaChamadoRepository repository;
    private final ChamadoService chamadoService;
    private final ChamadoRepository chamadoRepository;
    private final FuncionarioService funcionarioService;
    private final StatusService statusService;
    private final NotificacaoChamadoService notificacaoService;

    @Autowired
    public TransferenciaChamadoService(TransferenciaChamadoRepository repository, ChamadoService chamadoService, ChamadoRepository chamadoRepository, FuncionarioService funcionarioService, StatusService statusService, NotificacaoChamadoService notificacaoService) {
        this.repository = repository;
        this.chamadoService = chamadoService;
        this.chamadoRepository = chamadoRepository;
        this.funcionarioService = funcionarioService;
        this.statusService = statusService;
        this.notificacaoService = notificacaoService;
    }

    public List<TransferenciaChamado> findAll(Specification specification) {
        return repository.findAll(specification);
    }

    public List<TransferenciaChamado> findAllByChamado(Chamado chamado) {
        return repository.findAllByChamado(chamado);
    }

    public TransferenciaChamado findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Transferência de chamado não encontrada! Id: " + id));
    }

    @Transactional
    public void tranferirChamado(TransferenciaChamadoNewDTO transferenciaDto) {
        Funcionario user = UserService.authenticated().getFuncionario();
        Funcionario funcionarioPara = funcionarioService.findById(transferenciaDto.getIdFuncionarioDestino());
        List<TransferenciaChamado> listTransferencia = new ArrayList<>();
        List<Chamado> listChamado = new ArrayList<>();
        Status status = statusService.findById(transferenciaDto.getIdStatus());

        for (Long idChamado : transferenciaDto.getChamados()) {
            Chamado chamado = chamadoService.findById(idChamado);
            chamado.setStatus(status);
            listChamado.add(chamado);

            TransferenciaChamado transferencia = new TransferenciaChamado();
            transferencia.setChamado(chamado);
            transferencia.setJustificativa(transferenciaDto.getJustificativa());
            transferencia.setFuncionarioDe(user);
            transferencia.setFuncionarioPara(funcionarioPara);
            transferencia.setDataHoraEnvio(LocalDateTime.now());
            transferencia.setSituacao(SituacaoTransferencia.PENDENTE);
            listTransferencia.add(transferencia);
        }

        repository.saveAll(listTransferencia);
        chamadoRepository.saveAll(listChamado);
        notificacaoService.notificarTransferencia(listTransferencia);
    }

    @Transactional
    public void atualizarSituacao(List<TransferenciaSituacaoDTO> transerenciasDto) {
        List<TransferenciaChamado> transferencias = new ArrayList<>();
        List<Chamado> chamados = new ArrayList<>();

        for(TransferenciaSituacaoDTO dto : transerenciasDto) {
            TransferenciaChamado transferenciaChamado = findById(dto.getIdTransferencia());
            Chamado chamado = transferenciaChamado.getChamado();

            transferenciaChamado.setDataHoraConclusao(LocalDateTime.now());
            transferenciaChamado.setSituacao(dto.getSituacao());
            if (dto.getSituacao().equals(SituacaoTransferencia.ACEITO))
                chamado.setFuncionarioResponsavel(transferenciaChamado.getFuncionarioPara());
            else if (dto.getSituacao().equals(SituacaoTransferencia.RECUSADO))
                transferenciaChamado.setJustificativa(transferenciaChamado.getJustificativa()+"'\n' ------------ '\n'"+ dto.getJustificativa());

            chamados.add(chamado);
            transferencias.add(transferenciaChamado);
        }

        repository.saveAll(transferencias);
        chamadoRepository.saveAll(chamados);
        notificacaoService.notificarTransferencia(transferencias);
    }

    public List<TransferenciaChamadoDTO> buscarTransferenciasPendentes(Long idFuncionario) {
        return repository.transferenciaPendente(idFuncionario);
    }
}
