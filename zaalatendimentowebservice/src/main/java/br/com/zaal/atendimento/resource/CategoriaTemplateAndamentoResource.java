package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.entity.CategoriaTemplateAndamento;
import br.com.zaal.atendimento.entity.TemplateAndamento;
import br.com.zaal.atendimento.repository.CategoriaTemplateAndamentoRepository;
import br.com.zaal.atendimento.repository.TemplateAndamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("categoriatemplate")
public class CategoriaTemplateAndamentoResource {

    private final CategoriaTemplateAndamentoRepository repository;

    private final TemplateAndamentoRepository templateRepository;

    @Autowired
    public CategoriaTemplateAndamentoResource(CategoriaTemplateAndamentoRepository repository, TemplateAndamentoRepository templateRepository) {
        this.repository = repository;
        this.templateRepository = templateRepository;
    }

    @GetMapping
    public ResponseEntity<List<CategoriaTemplateAndamento>> buscarTodasCategorias() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/{id}/template")
    public ResponseEntity<List<TemplateAndamento>> buscarTemplatesDaCategoria(@PathVariable("id") Long idCategoria) {
        return ResponseEntity.ok(templateRepository.findByCategoriaTemplateAndamentoId(idCategoria));
    }
}
