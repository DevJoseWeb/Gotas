package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.entity.Status;
import br.com.zaal.atendimento.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("status")
public class StatusResource {

    private final StatusService service;

    @Autowired
    public StatusResource(StatusService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Status> buscarPorId(@PathVariable("id") Long id){
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Status>> buscarTodos(@RequestParam(value = "nome", required = false) String nome) {
        List<Status> list;

        if (nome == null)
            list = service.findAll();
        else
            list = service.findByNome(nome);

        return ResponseEntity.ok(list);
    }

}
