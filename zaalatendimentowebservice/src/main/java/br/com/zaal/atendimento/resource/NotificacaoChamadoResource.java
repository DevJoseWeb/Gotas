package br.com.zaal.atendimento.resource;

import br.com.zaal.atendimento.dto.NotificacaoChamadoDTO;
import br.com.zaal.atendimento.service.NotificacaoChamadoService;
import br.com.zaal.atendimento.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("notificacao")
public class NotificacaoChamadoResource {

    private final NotificacaoChamadoService service;

    public NotificacaoChamadoResource(NotificacaoChamadoService service) {
        this.service = service;
    }

    @ApiOperation("Visualiza notificação por código")
    @PatchMapping("/{id}")
    public ResponseEntity<NotificacaoChamadoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.visualizar(id));
    }

    @ApiOperation("Visualiza todas as notificações")
    @GetMapping
    public ResponseEntity<List<NotificacaoChamadoDTO>> buscarTodos() {
        return ResponseEntity.ok(service.buscarTodos(UserService.authenticated().getFuncionario()));
    }
}