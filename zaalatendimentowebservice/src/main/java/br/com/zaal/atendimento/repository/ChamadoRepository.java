package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.Chamado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ChamadoRepository extends JpaRepository<Chamado, Long>, JpaSpecificationExecutor<Chamado> {

//    @Query("SELECT new br.com.zaal.atendimento.domain.repository.dto.ChamadoCountDTO(count(c.id),c.funcionarioResponsavel.nome) FROM Chamado c  group by c.funcionarioResponsavel.nome")
//    List<ChamadoCountDTO> getChamadoCount();


}