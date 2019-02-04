package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    List<Funcionario> findByNomeContainingIgnoreCaseAndAtivoIsTrueOrderByNome(String nome);

    Funcionario findByUsuario(String usuario);
}
