package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.entity.Sistema;
import br.com.zaal.atendimento.service.SistemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("sistema")
public class SistemaResource {

    private final SistemaService service;

    @Autowired
    public SistemaResource(SistemaService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sistema> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Sistema>> buscarPorNome(@RequestParam(value = "nome", required = false) String nome) {
        List<Sistema> sistemas;

        if (nome != null)
            sistemas = service.findByNomeContainingIgnoreCaseOrderByNome(nome);
        else
            sistemas = service.findAll();

        return ResponseEntity.ok(sistemas);
    }
}