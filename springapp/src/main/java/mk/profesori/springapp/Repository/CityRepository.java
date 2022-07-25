package mk.profesori.springapp.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import mk.profesori.springapp.Model.City;

public interface CityRepository extends CrudRepository<City, Long>{

    public List<City> findAll();
    public City findByCityId(Long id);
}
