package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.entity.TipoChamado;
import br.com.zaal.atendimento.repository.specification.GenericSpecificationBuilder;
import br.com.zaal.atendimento.repository.specification.SearchOperation;
import br.com.zaal.atendimento.service.TipoChamadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tipochamado")
public class TipoChamadoResource {

    private final TipoChamadoService service;

    @Autowired
    public TipoChamadoResource(TipoChamadoService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoChamado> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<TipoChamado>> buscarTodos (@RequestParam(value = "nome", required = false) String nome){
        GenericSpecificationBuilder builder = new GenericSpecificationBuilder();
        builder.with("nome", SearchOperation.CONTAINS, nome);

        return ResponseEntity.ok(service.findAll(builder.build()));
    }
}