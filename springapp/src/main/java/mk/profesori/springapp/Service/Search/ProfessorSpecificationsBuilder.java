package mk.profesori.springapp.Service.Search;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.jpa.domain.Specification;

import mk.profesori.springapp.Model.Professor;

public class ProfessorSpecificationsBuilder {

    private final List<SearchCriteria> params;

    public ProfessorSpecificationsBuilder() {
        params = new ArrayList<SearchCriteria>();
    }

    public ProfessorSpecificationsBuilder with(String key, String operation, Object value) {
        params.add(new SearchCriteria(key, operation, value));
        return this;
    }

    public Specification<Professor> build() {
        if (params.size() == 0) {
            return null;
        }

        List<Specification<Professor>> specs = params.stream()
                .map(ProfessorSpecification::new)
                .collect(Collectors.toList());

        Specification<Professor> result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = params.get(i)
                    .isOrPredicate()
                            ? Specification.where(result)
                                    .or(specs.get(i))
                            : Specification.where(result)
                                    .and(specs.get(i));
        }
        return result;
    }
}
