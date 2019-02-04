package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.entity.OperacaoAtendimento;
import br.com.zaal.atendimento.service.OperacaoAtendimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("operacao")
public class OperacaoAtendimentoResource {

    private final OperacaoAtendimentoService service;

    @Autowired
    public OperacaoAtendimentoResource(OperacaoAtendimentoService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<OperacaoAtendimento> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<OperacaoAtendimento>> buscarPorNome(@RequestParam(value = "nome", required = false) String nome) {
        List<OperacaoAtendimento> operacoes;

        if (nome != null)
            operacoes = service.findAllByNomeContainingIgnoreCaseOrderByNome(nome);
        else
            operacoes = service.findAll();

        return ResponseEntity.ok(operacoes);
    }
}
