package br.com.zaal.atendimento.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EstadoCivil {
    SOLTEIRO("S"), CASADO("C"), DIVORCIADO("D"), VIUVO("V"), UNIAO("U");

    private String desc;

    EstadoCivil(String desc){
        this.desc = desc;
    }

    @JsonValue
    public String getDesc() {
        return desc;
    }

    @JsonCreator
    public static EstadoCivil parse(String desc) {
        if (desc == null) {
            return null;
        }
        EstadoCivil estadoCivil = null;

        for (EstadoCivil x : EstadoCivil.values()) {
            if (desc.equals(x.getDesc())) {
                estadoCivil = x;
                break;
            }
        }
        return estadoCivil;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}