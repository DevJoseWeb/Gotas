package br.com.zaal.atendimento.resource.util;

import br.com.zaal.atendimento.entity.Chamado;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;

public class Util {

    public static boolean canUpdate(Chamado chamado) {
        if (chamado == null)
            throw new ObjectNotFoundException("Chamado nulo") ;

        return (chamado.getDataHoraConclusao() == null);
    }
}
