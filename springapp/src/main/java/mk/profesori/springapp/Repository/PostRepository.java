package mk.profesori.springapp.Repository;

import mk.profesori.springapp.Model.CustomUserDetails;
import mk.profesori.springapp.Model.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface PostRepository extends CrudRepository<Post, Long> {
    Set<Post> findByAuthor(CustomUserDetails c);
}
