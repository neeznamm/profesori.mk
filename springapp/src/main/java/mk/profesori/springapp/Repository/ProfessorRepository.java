package mk.profesori.springapp.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.Professor;

@Repository
public interface ProfessorRepository extends CrudRepository<Professor, Long>{
    
    public List<Professor> findAll();
    public Professor findByProfessorId(Long id);
    public List<Professor> findByFaculty(Faculty faculty);
}
