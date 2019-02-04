package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.entity.Prioridade;
import br.com.zaal.atendimento.service.PrioridadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("prioridade")
public class PrioridadeResource {

    private final PrioridadeService service;

    @Autowired
    public PrioridadeResource(PrioridadeService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prioridade> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Prioridade>> buscarPorNome(@RequestParam(value = "nome", required = false) String nome) {
        List<Prioridade> prioridades;

        if (nome != null)
            prioridades = service.findByNomeContainingIgnoreCaseOrderByNome(nome);
        else
            prioridades = service.findAll();

        return ResponseEntity.ok(prioridades);
    }
}