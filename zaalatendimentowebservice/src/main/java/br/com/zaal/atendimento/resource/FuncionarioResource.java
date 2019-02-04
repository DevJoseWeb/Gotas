package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.entity.Funcionario;
import br.com.zaal.atendimento.service.FuncionarioService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("funcionario")
public class FuncionarioResource {

    private final FuncionarioService service;

    public FuncionarioResource(FuncionarioService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity insert(@Valid @RequestBody Funcionario funcionario, @PathVariable Long id) {
        funcionario.setId(id);
        service.save(funcionario);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Funcionario>> buscarPorNome(@RequestParam(value = "nome", required = false) String nome) {
        List<Funcionario> funcionarios;

        if (nome != null)
            funcionarios = service.findByNomeContainingIgnoreCaseOrderByNome(nome);
        else
            funcionarios = service.findAll();

        return ResponseEntity.ok(funcionarios);
    }
}
