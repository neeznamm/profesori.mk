package mk.profesori.springapp.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mk.profesori.springapp.Model.City;
import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.University;

@Repository
public interface UniversityRepository extends CrudRepository<University, Long>{

    public List<University> findAll();
    public University findByUniversityId(Long id);
    public List<University> findByCity(City city);
}
