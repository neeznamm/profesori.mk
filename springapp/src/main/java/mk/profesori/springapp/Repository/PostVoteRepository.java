package mk.profesori.springapp.Repository;

import mk.profesori.springapp.Model.PostVote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostVoteRepository extends CrudRepository<PostVote,Long> {
    PostVote findByPostVoteId(Long id);
}
