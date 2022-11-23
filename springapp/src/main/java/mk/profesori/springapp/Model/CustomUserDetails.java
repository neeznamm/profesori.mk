package mk.profesori.springapp.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class CustomUserDetails implements UserDetails {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;
    private String fullName;
    private String username;
    private String email;
    private String password; // TODO
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    private Boolean locked = false;
    private Boolean enabled = false;
    @OneToMany(mappedBy = "customUserDetails", fetch = FetchType.EAGER, orphanRemoval = true)
    private Set<ConfirmationToken> confirmationTokens = new HashSet<>();
    @OneToMany(mappedBy = "author", fetch = FetchType.EAGER, orphanRemoval = true)
    private Set<Post> authoredPosts = new HashSet<>();
    private Integer karma = 0;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PostVote> votes = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST})
    private Set<PostReport> reportsSubmitted = new HashSet<>();
    @PreRemove
    public void preRemove() {
        reportsSubmitted.forEach(report -> {
            report.setUser(null);
        });
    }

    public CustomUserDetails(String fullName, String username, String email, String password, UserRole userRole) {
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public Set<Post> getAuthoredPosts() {
        return this.authoredPosts;
    }

    public Integer getKarma() {
        return this.karma;
    }

    public void setKarma(Integer karma) {
        this.karma = karma;
    }

    @Override
    public String toString() {
        return this.id.toString();
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    public Set<PostVote> getVotes() {
        return votes;
    }

    public void setVotes(Set<PostVote> votes) {
        this.votes = votes;
    }
}
