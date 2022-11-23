package mk.profesori.springapp.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.University;

@Repository
public interface FacultyRepository extends CrudRepository<Faculty, Long>{

    List<Faculty> findAll();
    Faculty findByFacultyId(Long id);
    List<Faculty> findByUniversity(University university);
}
