package mk.profesori.springapp.Repository;

import mk.profesori.springapp.Model._Thread;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface _ThreadRepository extends CrudRepository<_Thread,Long> {
    _Thread findByPostId(Long postId);
}
