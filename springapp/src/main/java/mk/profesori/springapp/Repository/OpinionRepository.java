package mk.profesori.springapp.Repository;

import mk.profesori.springapp.Model.Opinion;
import mk.profesori.springapp.Model.Professor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpinionRepository extends CrudRepository<Opinion,Long> {
    Opinion findByPostId(Long postId);
    List<Opinion> findByTargetProfessor(Professor p);
    List<Opinion> findTop10ByOrderByTimePosted();
}
