package mk.profesori.springapp.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import mk.profesori.springapp.Model.CustomUserDetails;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<CustomUserDetails,Long> {
    Optional<CustomUserDetails> findByEmail(String email);
    Optional<CustomUserDetails> findByUsername(String username);

    @Transactional
    @Modifying
    @Query("UPDATE CustomUserDetails a " + "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableUser(String email);
}
