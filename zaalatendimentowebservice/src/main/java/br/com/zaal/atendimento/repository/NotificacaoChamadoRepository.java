package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.Funcionario;
import br.com.zaal.atendimento.entity.NotificacaoChamado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificacaoChamadoRepository extends JpaRepository<NotificacaoChamado, Long> {

    List<NotificacaoChamado> findAllByFuncionarioDestinatarioOrderByIdDesc(Funcionario funcionarioDestino);
}
