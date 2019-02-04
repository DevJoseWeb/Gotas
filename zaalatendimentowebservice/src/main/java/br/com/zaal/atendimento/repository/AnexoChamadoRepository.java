package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.AnexoChamado;
import br.com.zaal.atendimento.entity.Chamado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface AnexoChamadoRepository extends JpaRepository<AnexoChamado, Long> {

    List<AnexoChamado> findAllByChamado(Chamado chamado);

    @Transactional
    void deleteAllByChamadoAndNome(Chamado chamado, String nomeArquivo);
}