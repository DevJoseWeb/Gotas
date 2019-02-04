package br.com.zaal.atendimento.repository;

import br.com.zaal.atendimento.dto.TransferenciaChamadoDTO;
import br.com.zaal.atendimento.entity.Chamado;
import br.com.zaal.atendimento.entity.TransferenciaChamado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransferenciaChamadoRepository extends JpaRepository<TransferenciaChamado,Long>, JpaSpecificationExecutor<Chamado> {

    List<TransferenciaChamado> findAllByChamado(Chamado chamado);

    @Query("SELECT (count(obj.chamado)>0) FROM TransferenciaChamado obj WHERE (obj.chamado.id = :id) and (obj.dataHoraConclusao is null)")
    boolean existsTransfenciaNaoRecebida(@Param("id")Long idTransferencia);

    @Query("SELECT " +
            "new br.com.zaal.atendimento.dto.TransferenciaChamadoDTO("+
            "obj.id, " +
            "obj.chamado.id, " +
            "obj.chamado.cliente.id,"+
            "obj.chamado.cliente.razaoSocial,"+
            "obj.dataHoraEnvio,"+
            "obj.chamado.solicitante,"+
            "obj.chamado.assunto,"+
            "obj.funcionarioDe.id,"+
            "obj.funcionarioDe.nome)"+
            "FROM TransferenciaChamado obj WHERE (obj.funcionarioPara.id = :idFuncionario) and (obj.dataHoraConclusao is null)")
    List<TransferenciaChamadoDTO> transferenciaPendente(@Param("idFuncionario") Long idFuncionario);

}
