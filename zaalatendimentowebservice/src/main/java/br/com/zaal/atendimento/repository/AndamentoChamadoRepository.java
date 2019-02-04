package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.AndamentoChamado;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface AndamentoChamadoRepository extends JpaRepository<AndamentoChamado, Long> {

    @Transactional(readOnly = true)
    @Query("SELECT a from AndamentoChamado a where a.chamado.id = :idChamado")
    Page<AndamentoChamado> buscarAndamentosPorChamado(@Param("idChamado") Long idChamado, Pageable pageable);
}
