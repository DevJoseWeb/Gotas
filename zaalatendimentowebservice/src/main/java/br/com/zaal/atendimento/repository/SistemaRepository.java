package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.Sistema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SistemaRepository extends JpaRepository<Sistema, Long> {

    List<Sistema> findByNomeContainingIgnoreCaseOrderByNome(String nome);
}
