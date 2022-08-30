package mk.profesori.springapp.Model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private String fullName; // opcionalno, smee da e prazno
    private String username;
    private String email;
    private String password; // TODO dont expose password in api
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    private Boolean locked = false;
    private Boolean enabled = false;
    @OneToMany(mappedBy = "customUserDetails", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<ConfirmationToken> confirmationTokens = new HashSet<>();
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Post> authoredPosts = new HashSet<>();
    private Integer karma = 0;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "post_like", joinColumns = @JoinColumn(name = "custom_user_details_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
    Set<Post> likedPosts;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "post_dislike", joinColumns = @JoinColumn(name = "custom_user_details_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
    Set<Post> dislikedPosts;

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

    public Set<Post> getLikedPosts() {
        return this.likedPosts;
    }

    public void setLikedPosts(Set<Post> likedPosts) {
        this.likedPosts = likedPosts;
    }

    public Set<Post> getDislikedPosts() {
        return this.dislikedPosts;
    }

    public void setDislikedPosts(Set<Post> dislikedPosts) {
        this.likedPosts = dislikedPosts;
    }
}
