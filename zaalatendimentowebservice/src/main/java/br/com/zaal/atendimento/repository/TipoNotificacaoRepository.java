package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.TipoNotificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoNotificacaoRepository extends JpaRepository<TipoNotificacao, Long> {

}
