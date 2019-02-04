package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.Chamado;
import br.com.zaal.atendimento.entity.Feedback;
import br.com.zaal.atendimento.entity.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    @Transactional(readOnly = true)
    @Query("select f from Feedback f where f.chamado.id = :idChamado")
    List<Feedback> buscarFeedbackPorChamado(@Param("idChamado") Long idchamado);

    @Transactional(readOnly = true)
    boolean existsByChamadoAndFuncionario(Chamado chamado, Funcionario funcionario);

    @Transactional
    void deleteByChamadoAndFuncionario(Chamado chamado, Funcionario funcionario);
}
