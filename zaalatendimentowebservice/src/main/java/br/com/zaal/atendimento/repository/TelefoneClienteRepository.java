package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.entity.Cliente;
import br.com.zaal.atendimento.entity.TelefoneCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TelefoneClienteRepository extends JpaRepository<TelefoneCliente, Long> {

    List<TelefoneCliente> findAllByClienteOrderById(Cliente cliente);
}
