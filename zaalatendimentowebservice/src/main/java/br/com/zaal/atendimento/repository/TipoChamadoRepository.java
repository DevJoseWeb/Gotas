package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.TipoChamado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoChamadoRepository extends JpaRepository<TipoChamado, Long>, JpaSpecificationExecutor<TipoChamado> {

}
