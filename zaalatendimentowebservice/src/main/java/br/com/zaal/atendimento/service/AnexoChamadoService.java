package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.AndamentoChamado;
import br.com.zaal.atendimento.entity.AnexoChamado;
import br.com.zaal.atendimento.entity.Chamado;
import br.com.zaal.atendimento.entity.OperacaoAtendimento;
import br.com.zaal.atendimento.repository.AnexoChamadoRepository;
import br.com.zaal.atendimento.resource.util.Util;
import br.com.zaal.atendimento.service.exceptions.UnprocessableEntityException;
import br.com.zaal.atendimento.util.GerenciaArquivoUtil;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.List;

@Service
public class AnexoChamadoService {

    private final AnexoChamadoRepository repository;
    private final AndamentoChamadoService andamentoService;

    public AnexoChamadoService(AnexoChamadoRepository repository, AndamentoChamadoService andamentoService) {
        this.repository = repository;
        this.andamentoService = andamentoService;
    }

    @Transactional
    public String gravarAnexo(InputStream arquivo, String originalFilename, Chamado chamado) {

        if (!Util.canUpdate(chamado)){
            throw new UnprocessableEntityException("Chamado concluído ou cancelado");
        }

        GerenciaArquivoUtil gerenciadorArquivo = new GerenciaArquivoUtil("chamado/" + chamado.getId());
        String nomeArquivo = gerenciadorArquivo.gravarArquivo(arquivo, originalFilename);
        try {
            repository.save(new AnexoChamado(nomeArquivo, chamado));
            gravarAndamento(chamado,"Anexou arquivo: " + nomeArquivo, "Anexo arquivo");
            return nomeArquivo;
        } catch (Exception e) {
            gerenciadorArquivo.excluirArquivo(nomeArquivo);
            throw new RuntimeException(e.getMessage());
        }
    }

    private void gravarAndamento(Chamado chamado, String textoInterno, String textoCliente) {
        OperacaoAtendimento operacao = new OperacaoAtendimento(br.com.zaal.atendimento.entity.enums.OperacaoAtendimento.ANEXO_ARQUIVO.getId());

        AndamentoChamado andamentoChamado = new AndamentoChamado(chamado, textoCliente, textoInterno, operacao);
        andamentoService.save(andamentoChamado);
    }

    public Resource buscarAnexo(String nomeArquivo, Chamado chamado) {
        GerenciaArquivoUtil gerenciadorArquivo = new GerenciaArquivoUtil("chamado/" + chamado.getId());
        try {
            return gerenciadorArquivo.buscarArquivo(nomeArquivo);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void excluirAnexo(String nomeArquivo, Chamado chamado) {
        GerenciaArquivoUtil gerenciadorArquivo = new GerenciaArquivoUtil("chamado/" + chamado.getId());
        try {
            repository.deleteAllByChamadoAndNome(chamado, nomeArquivo);
            gravarAndamento(chamado,"Excluiu anexo: " + nomeArquivo, "Exclusão anexo");
            gerenciadorArquivo.excluirArquivo(nomeArquivo);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<AnexoChamado> buscarAnexos(Chamado chamado) {
        List<AnexoChamado> anexos;
        try {
            anexos = repository.findAllByChamado(chamado);
        } catch (Exception e) {
            throw new RuntimeException("Falha ao listar anexos");
        }
        return anexos;
    }
}