package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.entity.Setor;
import br.com.zaal.atendimento.service.SetorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("setor")
public class SetorResource {

    private final SetorService service;

    @Autowired
    public SetorResource(SetorService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Setor> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity insert(@Valid @RequestBody Setor setor, @PathVariable Long id) {
        setor.setId(id);
        service.save(setor);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Setor>> buscarPorNome(@RequestParam(value = "nome", required = false) String nome) {
        List<Setor> setores;

        if (nome != null)
            setores = service.findByNomeContainingIgnoreCaseOrderByNome(nome);
        else
            setores = service.findAll();

        return ResponseEntity.ok(setores);
    }
}
