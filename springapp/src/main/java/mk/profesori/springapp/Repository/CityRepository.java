package mk.profesori.springapp.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mk.profesori.springapp.Model.City;

@Repository
public interface CityRepository extends CrudRepository<City, Long>{

    List<City> findAll();
    City findByCityId(Long id);
}
