package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.OperacaoAtendimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OperacaoAtendimentoRepository extends JpaRepository<OperacaoAtendimento, Long> {

    List<OperacaoAtendimento> findAllByNomeContainingIgnoreCaseOrderByNome(String nome);
}
