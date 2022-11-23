package mk.profesori.springapp.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mk.profesori.springapp.Model.City;
import mk.profesori.springapp.Model.University;

@Repository
public interface UniversityRepository extends CrudRepository<University, Long> {

    List<University> findAll();

    University findByUniversityId(Long id);

    List<University> findByCity(City city);
}
