package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.AtuacaoChamado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AtuacaoChamadoRepository extends JpaRepository<AtuacaoChamado, Long> {

    @Transactional(readOnly = true)
    @Query("select a from AtuacaoChamado a where a.chamado.id = :idChamado order by a.dataHora")
    List<AtuacaoChamado> buscarAtuacoesPorChamado(@Param("idChamado") Long idChamado);
}
