package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.entity.MeioChamado;
import br.com.zaal.atendimento.service.MeioChamadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("meiochamado")
public class MeioChamadoResource {

    private final MeioChamadoService service;

    @Autowired
    public MeioChamadoResource(MeioChamadoService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MeioChamado> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<MeioChamado>> buscarPorNome(@RequestParam(value = "nome", required = false) String nome) {
        List<MeioChamado> meios;

        if (nome != null)
            meios = service.findByNomeContainingIgnoreCaseOrderByNome(nome);
        else
            meios = service.findAll();

        return ResponseEntity.ok(meios);
    }
}
