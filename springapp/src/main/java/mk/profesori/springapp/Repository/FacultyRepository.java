package mk.profesori.springapp.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.University;

@Repository
public interface FacultyRepository extends CrudRepository<Faculty, Long>{

    public List<Faculty> findAll();
    public Faculty findByFacultyId(Long id);
    public List<Faculty> findByUniversity(University university);
}
