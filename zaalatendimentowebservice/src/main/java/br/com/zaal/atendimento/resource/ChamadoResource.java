package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.dto.*;
import br.com.zaal.atendimento.entity.*;
import br.com.zaal.atendimento.entity.enums.OperacaoAtendimento;
import br.com.zaal.atendimento.repository.AtuacaoChamadoRepository;
import br.com.zaal.atendimento.repository.specification.GenericSpecificationBuilder;
import br.com.zaal.atendimento.repository.specification.SearchOperation;
import br.com.zaal.atendimento.service.*;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.persistence.criteria.JoinType;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("chamado")
public class ChamadoResource {

    private final ChamadoService service;
    private final AnexoChamadoService anexoService;
    private final AndamentoChamadoService andamentoService;
    private final AtuacaoChamadoRepository atuacaoRepository;
    private final FeedbackService feedbackService;
    private final TransferenciaChamadoService transferenciaService;

    @Autowired
    public ChamadoResource(ChamadoService service, AnexoChamadoService anexoService, AndamentoChamadoService andamentoService, AtuacaoChamadoRepository atuacaoRepository, FeedbackService feedbackService, TransferenciaChamadoService transferenciaService) {
        this.service = service;
        this.anexoService = anexoService;
        this.andamentoService = andamentoService;
        this.atuacaoRepository = atuacaoRepository;
        this.feedbackService = feedbackService;
        this.transferenciaService = transferenciaService;
    }

    @ApiOperation("Inclui chamado")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity gravar(@Valid @RequestBody ChamadoNewDTO dto) {
        Long id = service.insert(dto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().pathSegment("{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).build();
    }

    @ApiOperation("Busca chamado por protocolo")
    @GetMapping("/{id}")
    public ResponseEntity<Chamado> buscarPorId(@PathVariable Long id) {
        Chamado chamado = service.findById(id);

        if (chamado.getCliente().getGrupo() != null)
            chamado.getCliente().getGrupo().setClienteCentral(null);

        return ResponseEntity.ok(chamado);
    }

    @ApiOperation("Busca chamados com filtro avançado")
    @GetMapping
    public ResponseEntity<Page<Chamado>> buscarTodos(@RequestParam(value = "solicitante", required = false) String solicitante,
                                                     @RequestParam(value = "assunto", required = false) String assunto,
                                                     @RequestParam(value = "operacao", required = false) Long idOperacao,
                                                     @RequestParam(value = "cliente", required = false) Long idCliente,
                                                     @RequestParam(value = "setor", required = false) Long idSetor,
                                                     @RequestParam(value = "sistema", required = false) Long idSistema,
                                                     @RequestParam(value = "versao", required = false) Long idVersao,
                                                     @RequestParam(value = "meio", required = false) Long idMeio,
                                                     @RequestParam(value = "cadastro", required = false) Long idFuncionarioCadastro,
                                                     @RequestParam(value = "responsavel", required = false) Long idFuncionarioResponsavel,
                                                     @RequestParam(value = "desenvolvedor", required = false) Long idFuncionarioDesenvolvedor,
                                                     @RequestParam(value = "teste", required = false) Long idFuncionarioTeste,
                                                     @RequestParam(value = "prioridade", required = false) Long idPrioridade,
                                                     @RequestParam(value = "status", required = false) Long idStatus,
                                                     @RequestParam(value = "data", required = false) String tipoData,
                                                     @RequestParam(value = "periodode", required = false) String periodoDe,
                                                     @RequestParam(value = "periodoate", required = false) String periodoAte,
                                                     @RequestParam(value = "pagina", defaultValue = "0") Integer pagina,
                                                     @RequestParam(value = "itensPorPagina", defaultValue = "10") Integer itensPorPagina,
                                                     @RequestParam(value = "orderBy", defaultValue = "dataHoraAbertura") String orderBy,
                                                     @RequestParam(value = "direcao", defaultValue = "DESC") String direcao) {

        GenericSpecificationBuilder builder = new GenericSpecificationBuilder();
        builder.with("cliente", SearchOperation.EQUAL, idCliente);
        builder.with("sistema", SearchOperation.EQUAL, idSistema);
        builder.with("setor", idSetor, "funcionarioResponsavel", JoinType.INNER);
        builder.with("solicitante", SearchOperation.CONTAINS, solicitante);
        builder.with("versaoSistema", SearchOperation.EQUAL, idVersao);
        builder.with("assunto", SearchOperation.CONTAINS, assunto);
        builder.with("meio", SearchOperation.EQUAL, idMeio);
        builder.with("funcionarioCadastro", SearchOperation.EQUAL, idFuncionarioCadastro);
        builder.with("funcionarioResponsavel", SearchOperation.EQUAL, idFuncionarioResponsavel);
        builder.with("funcionarioDesenvolvedor", SearchOperation.EQUAL, idFuncionarioDesenvolvedor);
        builder.with("funcionarioTeste", SearchOperation.EQUAL, idFuncionarioTeste);
        builder.with("prioridade", SearchOperation.EQUAL, idPrioridade);
        builder.with("status", SearchOperation.EQUAL, idStatus);

        if (idOperacao != null && idOperacao.equals(OperacaoAtendimento.PENDENTE.getId()))
            builder.with("dataHoraConclusao", SearchOperation.IS_NULL);
        else
            builder.with("operacao", SearchOperation.EQUAL, idOperacao);

        LocalDate dateDe;
        LocalDate dateAte;
        try {
            dateDe = LocalDate.parse(periodoDe);
        } catch (Exception e) {
            dateDe = null;
        }

        try {
            dateAte = LocalDate.parse(periodoAte);
        } catch (Exception e) {
            dateAte = null;
        }

        if (tipoData != null && dateDe != null && dateAte != null) {
            if (tipoData.equalsIgnoreCase("abertura"))
                builder.with("dataHoraAbertura", SearchOperation.BETWEEN, dateDe, dateAte);
            else if (tipoData.equalsIgnoreCase("conclusao"))
                builder.with("dataHoraConclusao", SearchOperation.BETWEEN, dateDe, dateAte);
            else if (tipoData.equalsIgnoreCase("previsao"))
                builder.with("dataHoraPrevisao", SearchOperation.BETWEEN, dateDe, dateAte);
        } else if (tipoData != null || dateDe != null || dateAte != null)
            return ResponseEntity.badRequest().build();

        Page<Chamado> page = service.findAll(builder.build(), pagina, itensPorPagina, orderBy, direcao);

        for (Chamado chamado : page.getContent()) {
            if (chamado.getCliente().getGrupo() != null)
                chamado.getCliente().getGrupo().setClienteCentral(null);
        }

        return ResponseEntity.ok(page);
    }

    @ApiOperation("Lista anexos do chamado")
    @GetMapping("/{id}/anexo")
    public ResponseEntity<List<AnexoChamado>> listarAnexos(@PathVariable("id") Long idChamado) {
        Chamado chamado = service.findById(idChamado);
        List<AnexoChamado> anexos = anexoService.buscarAnexos(chamado);

        for (AnexoChamado anexo : anexos) {
            String location = ServletUriComponentsBuilder.fromCurrentRequest().pathSegment(anexo.getNome()).toUriString();

            anexo.setUri(location);
            anexo.setChamado(null);
        }

        return ResponseEntity.ok(anexos);
    }

    @ApiOperation("Realiza donwload do anexo do chamado")
    @GetMapping("/{id}/anexo/{fileName:.+}")
    public ResponseEntity<Resource> buscarAnexo(@PathVariable("id") Long idChamado, @PathVariable String fileName, HttpServletRequest request) {

        Chamado chamado = service.findById(idChamado);
        Resource resource = anexoService.buscarAnexo(fileName, chamado);

        if (!resource.exists())
            return ResponseEntity.notFound().build();

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {

        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @ApiOperation("Inclui anexo no chamado")
    @PostMapping(value = "/{id}/anexo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity gravarAnexo(@PathVariable("id") Long idChamado, @RequestParam("arquivo") MultipartFile arquivo) throws IOException {

        Chamado chamado = service.findById(idChamado);
        String nomeArquivo = anexoService.gravarAnexo(arquivo.getInputStream(), arquivo.getOriginalFilename(), chamado);

        URI location = URI.create(ServletUriComponentsBuilder.fromCurrentRequest().pathSegment(nomeArquivo).toUriString());
        return ResponseEntity.created(location).build();
    }

    @ApiOperation("Exclui anexo do chamado")
    @DeleteMapping("/{id}/anexo/{fileName:.+}")
    public ResponseEntity excluirAnexo(@PathVariable("id") Long idChamado, @PathVariable("fileName") String filename) {
        Chamado chamado = service.findById(idChamado);
        anexoService.excluirAnexo(filename, chamado);
        return ResponseEntity.noContent().build();
    }

    @ApiOperation("Lista andamentos do chamado")
    @GetMapping("/{id}/andamento")
    public ResponseEntity<Page<AndamentoChamado>> buscarAndamentos(@PathVariable("id") Long idChamado,
                                                                   @RequestParam(value = "pagina", defaultValue = "0") Integer pagina,
                                                                   @RequestParam(value = "itensPorPagina", defaultValue = "10") Integer itensPorPagina,
                                                                   @RequestParam(value = "orderBy", defaultValue = "dataHora") String orderBy,
                                                                   @RequestParam(value = "direcao", defaultValue = "DESC") String direcao) {

        Page<AndamentoChamado> andamentos = andamentoService.buscarAndamentosPorChamado(idChamado, pagina, itensPorPagina, orderBy, direcao);
        return ResponseEntity.ok().body(andamentos);
    }

    @ApiOperation("Lista funcionários envolvidos no chamado")
    @GetMapping("/{id}/atuacao")
    public ResponseEntity<List<AtuacaoChamado>> buscarAtuacao(@PathVariable("id") Long idChamado) {
        return ResponseEntity.ok(atuacaoRepository.buscarAtuacoesPorChamado(idChamado));
    }

    @ApiOperation("Lista funcionários recebendo feedbacks do chamado")
    @GetMapping("/{id}/feedback")
    public ResponseEntity<List<Feedback>> buscarFeedback(@PathVariable("id") Long idChamado) {
        return ResponseEntity.ok(feedbackService.buscarFeedbackPorChamado(idChamado));
    }

    @ApiOperation("Insere funcionário no feedback do chamado")
    @PostMapping(value = "/{id}/feedback", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity gravarFeedback(@PathVariable("id") Long idChamado) {
        feedbackService.gravar(service.findById(idChamado), UserService.authenticated().getFuncionario());
        return ResponseEntity.noContent().build();
    }

    @ApiOperation("Remove funcionário do feedback do chamado")
    @DeleteMapping("/{id}/feedback")
    public ResponseEntity removerFeedback(@PathVariable("id") Long idChamado) {
        feedbackService.remover(service.findById(idChamado), UserService.authenticated().getFuncionario());
        return ResponseEntity.noContent().build();
    }

    @ApiOperation("Inclui andamento no chamado")
    @PostMapping(value = "/{id}/andamento", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity gravarAndamento(@PathVariable("id") Long idChamado, @RequestBody AndamentoChamado andamento) {
        andamento.setChamado(service.findById(idChamado));
        andamentoService.save(andamento);
        URI location = URI.create(ServletUriComponentsBuilder.fromCurrentRequest().toUriString());
        return ResponseEntity.created(location).build();
    }

    @ApiOperation("Lista transferências do chamado")
    @GetMapping("/{id}/transferencia")
    public ResponseEntity<List<TransferenciaChamado>> buscarTransferencias(@PathVariable("id") Long idChamado) {
        Chamado chamado = service.findById(idChamado);
        return ResponseEntity.ok(transferenciaService.findAllByChamado(chamado));
    }

    @ApiOperation("Transfere chamado")
    @PostMapping(value = "/transferencia", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity transferirChamado(@Valid @RequestBody TransferenciaChamadoNewDTO transferenciaDto) {
        transferenciaService.tranferirChamado(transferenciaDto);
        return ResponseEntity.noContent().build();
    }

    @ApiOperation("Atualiza situação da transferência(aceita/recusa)")
    @PatchMapping("/transferencia")
    public ResponseEntity atualizarSituacaoTransferencia(@Valid @RequestBody TransferenciaSituacaoDTOLista transerenciasDto) {
        transferenciaService.atualizarSituacao(transerenciasDto.getTransferencias());
        return ResponseEntity.noContent().build();
    }

    @ApiOperation("Lista transferência pendente de um funcionário")
    @GetMapping("/transferencia/pendente")
    public ResponseEntity<List<TransferenciaChamadoDTO>> buscarTransferenciaPendente() {
        return ResponseEntity.ok(transferenciaService.buscarTransferenciasPendentes(UserService.authenticated().getFuncionario().getId()));
    }

    @ApiOperation("Atualiza chamados")
    @PatchMapping
    public ResponseEntity atualizarChamado(@Valid @RequestBody ChamadoUpdateDTOList chamadosDto) {
        service.atualizarChamado(chamadosDto);
        return ResponseEntity.noContent().build();
    }
}