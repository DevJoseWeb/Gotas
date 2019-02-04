package br.com.zaal.atendimento.service.validation;

import br.com.zaal.atendimento.dto.TransferenciaChamadoNewDTO;
import br.com.zaal.atendimento.entity.Chamado;
import br.com.zaal.atendimento.repository.TransferenciaChamadoRepository;
import br.com.zaal.atendimento.resource.exception.FieldMessage;
import br.com.zaal.atendimento.resource.util.Util;
import br.com.zaal.atendimento.service.ChamadoService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;

public class TransferenciaChamadoInsertValidator implements ConstraintValidator<TransferenciaChamadoInsert, TransferenciaChamadoNewDTO> {

    private final TransferenciaChamadoRepository repository;
    private final ChamadoService chamadoService;

    @Autowired
    public TransferenciaChamadoInsertValidator(TransferenciaChamadoRepository repository, ChamadoService chamadoService) {
        this.repository = repository;
        this.chamadoService = chamadoService;
    }

    @Override
    public void initialize(TransferenciaChamadoInsert ann) {
    }

    @Override
    public boolean isValid(TransferenciaChamadoNewDTO dto, ConstraintValidatorContext context) {

        List<FieldMessage> list = new ArrayList<>();

        for (Long idChamado : dto.getChamados()) {
            Chamado chamado = chamadoService.findById(idChamado);
            if (!Util.canUpdate(chamado))
                list.add(new FieldMessage("chamados", "Chamado concluído ou cancelado. Id: " + chamado.getId()));

            if (chamado.getFuncionarioResponsavel().getId().equals(dto.getIdFuncionarioDestino()))
                list.add(new FieldMessage("IdFuncionarioDestino", "Funcionário já é o responsável do chamado. Id: " + chamado.getId()));

            if (repository.existsTransfenciaNaoRecebida(chamado.getId()))
                list.add(new FieldMessage("chamados", "Chamado já transferido. Id: " + chamado.getId()));
        }

        for (FieldMessage e : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        }
        return list.isEmpty();
    }
}