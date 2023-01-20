package mk.profesori.springapp.Repository;

import mk.profesori.springapp.Model.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends CrudRepository<City, Long>{
    List<City> findAll();
    City findByCityId(Long id);
}
