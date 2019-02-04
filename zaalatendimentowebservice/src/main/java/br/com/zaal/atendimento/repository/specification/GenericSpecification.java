package br.com.zaal.atendimento.repository.specification;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class GenericSpecification implements Specification {

    private SearchCriteria criteria;

    public GenericSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder builder) {
        switch (criteria.getOperation()) {
            case EQUAL:
                if (criteria.getJoin() != null)
                    return builder.equal(root.join(criteria.getJoin().getKey(), criteria.getJoin().getJoinType()).get(criteria.getKey()), criteria.getValue());
                else
                    return builder.equal(root.get(criteria.getKey()), criteria.getValue());
            case NEGATION:
                return builder.notEqual(root.get(criteria.getKey()), criteria.getValue());
            case GREATER_THAN:
                return builder.greaterThan(root.<String>get(criteria.getKey()), criteria.getValue().toString());
            case LESS_THAN:
                return builder.lessThan(root.<String>get(criteria.getKey()), criteria.getValue().toString());
            case LIKE:
                return builder.like(root.<String>get(criteria.getKey()), criteria.getValue().toString());
            case STARTS_WITH:
                return builder.like(root.<String>get(criteria.getKey()), criteria.getValue() + "%");
            case ENDS_WITH:
                return builder.like(root.<String>get(criteria.getKey()), "%" + criteria.getValue());
            case CONTAINS:
                return builder.like(root.<String>get(criteria.getKey()), "%" + criteria.getValue() + "%");
            case BETWEEN:
                if (criteria.getValue() instanceof LocalDate)
                    return builder.between(root.<LocalDate>get(criteria.getKey()), (LocalDate) criteria.getValue(), (LocalDate) criteria.getValueTo());
                else if (criteria.getValue() instanceof LocalTime)
                    return builder.between(root.<LocalTime>get(criteria.getKey()), (LocalTime) criteria.getValue(), (LocalTime) criteria.getValueTo());
                else if (criteria.getValue() instanceof LocalDateTime)
                    return builder.between(root.<LocalDateTime>get(criteria.getKey()), (LocalDateTime) criteria.getValue(), (LocalDateTime) criteria.getValueTo());
            case IS_NULL:
                return builder.isNull(root.get(criteria.getKey()));
            case IS_NOTNULL:
                return builder.isNotNull(root.get(criteria.getKey()));
            default:
                return null;
        }
    }

    public SearchCriteria getCriteria() {
        return criteria;
    }
}