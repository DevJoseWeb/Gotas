package br.com.zaal.atendimento.repository.specification;

import javax.persistence.criteria.JoinType;

public class SearchJoinCriteria {

    private String key;
    private JoinType joinType;

    public SearchJoinCriteria(String keyJoin, JoinType joinType) {
        this.key = keyJoin;
        this.joinType = joinType;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public JoinType getJoinType() {
        return joinType;
    }

    public void setJoinType(JoinType joinType) {
        this.joinType = joinType;
    }
}
