package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {

    List<Status> findByNomeContainsIgnoreCaseOrderByNome(String nome);
}
