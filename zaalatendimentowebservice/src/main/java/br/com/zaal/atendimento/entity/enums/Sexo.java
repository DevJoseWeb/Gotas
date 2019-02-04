package br.com.zaal.atendimento.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Sexo {
    MASCULINO("M"),
    FEMININO("F");

    private String desc;

    Sexo(String desc){
        this.desc = desc;
    }

    @JsonValue
    public String getDesc() {
        return desc;
    }

    @JsonCreator
    public static Sexo parse(String desc) {
        if (desc == null) {
            return null;
        }
        Sexo sexo = null;
        for (Sexo x : Sexo.values()) {
            if (desc.equals(x.getDesc())) {
                sexo = x;
                break;
            }
        }
        return sexo;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}