package mk.profesori.springapp.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.Professor;

public interface ProfessorRepository extends CrudRepository<Professor, Long>{
    
    public List<Professor> findAll();
    public Professor findByProfessorId(Long id);
    public List<Professor> findByFaculty(Faculty faculty);
}
