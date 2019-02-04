package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>, JpaSpecificationExecutor<Cliente> {

    List<Cliente> findByCnpjOrderByNomeFantasia(String cnpj);
    List<Cliente> findByCpfOrderByNomeFantasia(String cpf);
    List<Cliente> findByNomeFantasiaContainingIgnoreCaseOrRazaoSocialContainingIgnoreCaseOrderByNomeFantasia(String nomeFantasia, String razaoSocial);
    List<Cliente> findByGrupoNomeContainingIgnoreCase(String grupo);
}