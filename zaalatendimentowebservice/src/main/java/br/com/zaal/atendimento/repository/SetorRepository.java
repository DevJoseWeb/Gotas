package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.Setor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SetorRepository extends JpaRepository<Setor, Long> {

    List<Setor> findByNomeContainingIgnoreCaseOrderByNome(String nome);
}
