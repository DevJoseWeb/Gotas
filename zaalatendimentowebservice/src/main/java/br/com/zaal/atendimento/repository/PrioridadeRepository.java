package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.Prioridade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrioridadeRepository extends JpaRepository<Prioridade, Long> {

    List<Prioridade> findByNomeContainingIgnoreCaseOrderByNome(String nome);
}
