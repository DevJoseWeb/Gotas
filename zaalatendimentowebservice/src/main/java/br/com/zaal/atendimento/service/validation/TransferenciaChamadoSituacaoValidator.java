package br.com.zaal.atendimento.service.validation;

import br.com.zaal.atendimento.dto.TransferenciaSituacaoDTO;
import br.com.zaal.atendimento.entity.TransferenciaChamado;
import br.com.zaal.atendimento.entity.enums.SituacaoTransferencia;
import br.com.zaal.atendimento.resource.exception.FieldMessage;
import br.com.zaal.atendimento.resource.util.Util;
import br.com.zaal.atendimento.service.TransferenciaChamadoService;
import br.com.zaal.atendimento.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;

public class TransferenciaChamadoSituacaoValidator implements ConstraintValidator<TransferenciaChamadoSituacao, TransferenciaSituacaoDTO> {

    private final TransferenciaChamadoService service;
    private final UserService userService;

    @Autowired
    public TransferenciaChamadoSituacaoValidator(TransferenciaChamadoService service, UserService userService) {
        this.service = service;
        this.userService = userService;
    }

    @Override
    public void initialize(TransferenciaChamadoSituacao ann) {
    }


    @Override
    public boolean isValid(TransferenciaSituacaoDTO dto, ConstraintValidatorContext context) {

        List<FieldMessage> list = new ArrayList<>();
        TransferenciaChamado transferencia = service.findById(dto.getIdTransferencia());

        if (transferencia.getDataHoraConclusao() != null)
            list.add(new FieldMessage("situacao", "Transfência já foi concluída!"));
        else  if (!Util.canUpdate(transferencia.getChamado()))
            list.add(new FieldMessage("situacao", "Chamado está concluído!"));
        else {
            switch (dto.getSituacao()) {
                case ACEITO:
                    if (!transferencia.getSituacao().equals(SituacaoTransferencia.PENDENTE))
                        list.add(new FieldMessage("situacao", "Transferência não está PENDENTE"));
                    break;
                case RECUSADO:
                    if (!transferencia.getSituacao().equals(SituacaoTransferencia.PENDENTE))
                        list.add(new FieldMessage("justificativa", "Transferência não está PENDENTE"));

                    if (dto.getJustificativa() == null || dto.getJustificativa().isEmpty())
                        list.add(new FieldMessage("justificativa", "Preenchimento obrigatório"));
                    break;
                default:
                    list.add(new FieldMessage("situacao", "Situação transfência inválida"));
                    break;
            }

            if (!userService.authenticated().getFuncionario().getId().equals(transferencia.getFuncionarioPara().getId()))
                list.add(new FieldMessage("idTransferencia", "Transferência é para outro funcionário"));
        }

        for (FieldMessage e : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        }
        return list.isEmpty();
    }
}