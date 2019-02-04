package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.entity.Cliente;
import br.com.zaal.atendimento.entity.TelefoneCliente;
import br.com.zaal.atendimento.repository.specification.GenericSpecificationBuilder;
import br.com.zaal.atendimento.repository.specification.SearchOperation;
import br.com.zaal.atendimento.service.ClienteService;
import br.com.zaal.atendimento.service.TelefoneClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.JoinType;
import java.util.List;

@RestController
@RequestMapping("cliente")
public class ClienteResource {

    private final ClienteService service;
    private final TelefoneClienteService telefoneService;

    @Autowired
    public ClienteResource(ClienteService service, TelefoneClienteService telefoneService) {
        this.service = service;
        this.telefoneService = telefoneService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable("id") Long id) {
        Cliente cliente = service.findById(id);

        if (cliente.getGrupo() != null)
            cliente.getGrupo().setClienteCentral(null);

        return ResponseEntity.ok(cliente);
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> buscarPorCpfOuCnpjOuNome(@RequestParam(value = "cnpj", required = false) String cnpj,
                                                                  @RequestParam(value = "cpf", required = false)  String cpf,
                                                                  @RequestParam(value = "nome", required = false) String nome,
                                                                  @RequestParam(value = "grupo", required = false) String grupo) {

        GenericSpecificationBuilder builder = new GenericSpecificationBuilder();
        builder.with("cnpj", SearchOperation.EQUAL, cnpj);
        builder.with("cpf", SearchOperation.EQUAL, cpf);
        builder.with("nome", grupo, "grupo", JoinType.INNER);
        builder.with("nomeFantasia", SearchOperation.CONTAINS, nome);
        builder.with("razaoSocial", SearchOperation.CONTAINS, nome, true);

        List<Cliente> clientes = service.findAll(builder.build());

        for (Cliente cliente : clientes) {
            if (cliente.getGrupo() != null)
                cliente.getGrupo().setClienteCentral(null);
        }

        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{idCliente}/telefone")
    public ResponseEntity<List<TelefoneCliente>> buscarContatoPorCliente(@PathVariable("idCliente") Long idCliente) {
        Cliente cliente = service.findById(idCliente);
        List<TelefoneCliente> telefones = telefoneService.findAllByClienteOrderById(cliente);

        for (TelefoneCliente telefone : telefones)
            telefone.setCliente(null);

        return ResponseEntity.ok(telefones);
    }
}