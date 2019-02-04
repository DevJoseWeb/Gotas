package br.com.zaal.atendimento.repository.specification;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.JoinType;
import java.util.ArrayList;
import java.util.List;

public class GenericSpecificationBuilder {

    private List<SearchCriteria> params;

    public GenericSpecificationBuilder() {
        this.params = new ArrayList<>();
    }

    public GenericSpecificationBuilder with(String key, SearchOperation operation, Object value) {

        if ((operation != null) ) {
            if (value != null) {
                if (operation.equals(SearchOperation.EQUAL)) {
                    boolean startWithAsterisk = value.toString().startsWith("*");
                    boolean endWithAsterisk = value.toString().endsWith("*");

                    if (startWithAsterisk && endWithAsterisk) {
                        operation = SearchOperation.CONTAINS;
                    } else if (startWithAsterisk) {
                        operation = SearchOperation.ENDS_WITH;
                    } else if (endWithAsterisk) {
                        operation = SearchOperation.STARTS_WITH;
                    }
                }
                params.add(new SearchCriteria(key, operation, value));
            }
            else if (operation == SearchOperation.IS_NULL || operation == SearchOperation.IS_NOTNULL){
                params.add(new SearchCriteria(key, operation));
            }
        }
        return this;
    }

    public GenericSpecificationBuilder with(String key, SearchOperation operation, Object value, Object valueTo) {

        params.add(new SearchCriteria(key, operation, value, valueTo, false));
        return this;
    }

    public GenericSpecificationBuilder with(String key, Object value, String keyJoin, JoinType typeJoin) {

        params.add(new SearchCriteria(key, SearchOperation.EQUAL, value, keyJoin, typeJoin));
        return this;
    }

    public GenericSpecificationBuilder with(String key, SearchOperation operation) {

        params.add(new SearchCriteria(key, operation));
        return this;
    }

    public Specification build() {
        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = new ArrayList<>();
        for (SearchCriteria param : params) {
            if (param.getValue() != null || (param.getOperation() == SearchOperation.IS_NULL || param.getOperation() == SearchOperation.IS_NOTNULL)) {
                specs.add(new GenericSpecification(param));
            }
        }

        if (!specs.isEmpty()) {
            Specification result = specs.get(0);
            for (int i = 1; i < specs.size(); i++) {
                GenericSpecification x = (GenericSpecification) specs.get(i);
                result = x.getCriteria().isOrPredicate()
                            ? Specification.where(result).or(specs.get(i))
                            : Specification.where(result).and(specs.get(i));
            }
            return result;
        } else {
            return null;
        }
    }

    public GenericSpecificationBuilder with(String key, SearchOperation operation, Object value, boolean orPredicate) {

        params.add(new SearchCriteria(key, operation, value, null, orPredicate));
        return this;
    }
}
