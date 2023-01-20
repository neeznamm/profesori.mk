package mk.profesori.springapp.Repository;

import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.Professor;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfessorRepository extends CrudRepository<Professor, Long>, JpaSpecificationExecutor<Professor> {

    List<Professor> findAll();
    Professor findByProfessorId(Long id);
    List<Professor> findByFaculty(Faculty faculty);
    List<Professor> findByProfessorNameContainingIgnoreCase(String name);
}
