package mk.profesori.springapp.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.University;

public interface FacultyRepository extends CrudRepository<Faculty, Long>{

    public List<Faculty> findAll();
    public Faculty findByFacultyId(Long id);
    public List<Faculty> findByUniversity(University university);
}
