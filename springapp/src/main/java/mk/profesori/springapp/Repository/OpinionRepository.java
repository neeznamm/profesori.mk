package mk.profesori.springapp.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mk.profesori.springapp.Model.Opinion;

@Repository
public interface OpinionRepository extends CrudRepository<Opinion, Long> {
    public Opinion findByPostId(Long id);
}
