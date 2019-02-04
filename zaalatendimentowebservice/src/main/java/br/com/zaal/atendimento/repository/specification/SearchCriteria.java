package br.com.zaal.atendimento.repository.specification;

import javax.persistence.criteria.JoinType;

public class SearchCriteria {

    private String key;
    private SearchOperation operation;
    private Object value;
    private Object valueTo;
    private SearchJoinCriteria join;
    private boolean orPredicate;

    public SearchCriteria(String key, SearchOperation operation, Object value) {
        this.key = key;
        this.operation = operation;
        this.value = value;
        this.valueTo = null;
        this.join = null;
    }

    public SearchCriteria(String key, SearchOperation operation, Object value, Object valueTo, boolean orPredicate) {
        this.key = key;
        this.operation = operation;
        this.value = value;
        this.valueTo = valueTo;
        this.orPredicate = orPredicate;
    }

    public SearchCriteria(String key, SearchOperation operation, Object value, String keyJoin, JoinType joinType) {
        this.key = key;
        this.operation = operation;
        this.value = value;
        this.join = new SearchJoinCriteria(keyJoin, joinType);
    }

    public SearchCriteria(String key, SearchOperation operation) {
        this.key = key;
        this.operation = operation;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public SearchOperation getOperation() {
        return operation;
    }

    public void setOperation(SearchOperation operation) {
        this.operation = operation;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public Object getValueTo() {
        return valueTo;
    }

    public void setValueTo(Object valueTo) {
        this.valueTo = valueTo;
    }

    public SearchJoinCriteria getJoin() {
        return join;
    }

    public void setJoin(SearchJoinCriteria join) {
        this.join = join;
    }

    public boolean isOrPredicate() {
        return orPredicate;
    }

    public void setOrPredicate(boolean orPredicate) {
        this.orPredicate = orPredicate;
    }
}