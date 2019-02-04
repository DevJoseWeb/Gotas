package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.MeioChamado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeioChamadoRepository extends JpaRepository<MeioChamado, Long> {

    List<MeioChamado> findByNomeContainingIgnoreCaseOrderByNome(String nome);
}
