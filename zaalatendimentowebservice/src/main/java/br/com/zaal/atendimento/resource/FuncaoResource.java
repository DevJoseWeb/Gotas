package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.entity.Funcao;
import br.com.zaal.atendimento.service.FuncaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("funcao")
public class FuncaoResource {

    private FuncaoService funcaoService;

    @Autowired
    public FuncaoResource(FuncaoService funcaoService) {
        this.funcaoService = funcaoService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcao> find(@PathVariable Long id) {
        return ResponseEntity.ok().body(funcaoService.find(id));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity insert(@Valid @RequestBody Funcao funcao, @PathVariable Long id) {
        funcao.setId(id);
        funcaoService.save(funcao);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        funcaoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
