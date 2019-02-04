package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Integer> {

    List<Cidade> findByNomeContainingIgnoreCaseOrderByNome(String nome);

}