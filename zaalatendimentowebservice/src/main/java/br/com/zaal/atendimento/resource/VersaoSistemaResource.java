package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.entity.VersaoSistema;
import br.com.zaal.atendimento.service.VersaoSistemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("versaosistema")
public class VersaoSistemaResource {

    private final VersaoSistemaService service;

    @Autowired
    public VersaoSistemaResource(VersaoSistemaService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<VersaoSistema> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<VersaoSistema>> buscarPorNome(@RequestParam(value = "nome", required = false) String nome) {
        List<VersaoSistema> versoes;

        if (nome != null)
            versoes = service.findByNomeContainingIgnoreCaseOrderByNome(nome);
        else
            versoes = service.findAll();

        return ResponseEntity.ok(versoes);
    }
}
