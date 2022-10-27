package mk.profesori.springapp.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mk.profesori.springapp.Model.Subject;

@Repository
public interface SubjectRepository extends CrudRepository<Subject, Long> {
    public Subject findBySubjectId(Long id);
}
