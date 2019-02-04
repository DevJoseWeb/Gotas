package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.TemplateAndamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TemplateAndamentoRepository extends JpaRepository<TemplateAndamento, Long> {

    List<TemplateAndamento> findByCategoriaTemplateAndamentoId(Long id);
}
