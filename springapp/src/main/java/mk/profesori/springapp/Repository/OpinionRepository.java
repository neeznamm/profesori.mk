package mk.profesori.springapp.Repository;

import mk.profesori.springapp.Model.Opinion;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpinionRepository extends CrudRepository<Opinion,Long> {
    Opinion findByPostId(Long postId);
}
