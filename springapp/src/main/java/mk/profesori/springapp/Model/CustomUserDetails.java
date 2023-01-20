package mk.profesori.springapp.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private String email;
    @JsonIgnore
    private String password;
    /*  UseCases
        го уредува својот кориснички профил
        го верификува својот кориснички профил todo...
    */
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    private Boolean locked = false;
    private Boolean enabled = false;
    @Transient
    @OneToMany(mappedBy = "customUserDetails", orphanRemoval = true)
    private Set<ConfirmationToken> confirmationTokens = new HashSet<>();
    @Transient
    @OneToMany(mappedBy = "author", orphanRemoval = true)
    private Set<Post> authoredPosts = new HashSet<>();
    private Integer karma = 0;

    @Transient
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PostVote> votes = new HashSet<>();

    @Transient
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

    @Override
    public String toString() {
        return this.id.toString();
    }
}
