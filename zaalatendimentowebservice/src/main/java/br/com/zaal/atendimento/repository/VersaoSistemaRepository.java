package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.VersaoSistema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VersaoSistemaRepository extends JpaRepository<VersaoSistema, Long> {
    List<VersaoSistema> findByNomeContainingIgnoreCaseOrderByNome(String nome);
}
