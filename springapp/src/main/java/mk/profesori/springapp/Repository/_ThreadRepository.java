package mk.profesori.springapp.Repository;

import mk.profesori.springapp.Model.Subject;
import mk.profesori.springapp.Model._Thread;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface _ThreadRepository extends CrudRepository<_Thread,Long> {
    _Thread findByPostId(Long postId);
    List<_Thread> findTop10ByOrderByTimePosted();
    List<_Thread> findByTargetSubject(Subject s);
}
