package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.entity.Cidade;
import br.com.zaal.atendimento.service.CidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("cidade")
public class CidadeResource {

    private final CidadeService service;

    @Autowired
    public CidadeResource(CidadeService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cidade> buscarPorId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity insert(@Valid @RequestBody Cidade cidade, @PathVariable Integer id) {
        cidade.setCodigo(id);
        service.save(cidade);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Cidade>> buscarPorNome(@RequestParam(value = "nome", required = false) String nome) {
        List<Cidade> cidades;

        if (nome != null)
            cidades = service.findByNomeContainingIgnoreCaseOrderByNome(nome);
        else
            cidades = service.findAll();

        return ResponseEntity.ok(cidades);
    }
}
