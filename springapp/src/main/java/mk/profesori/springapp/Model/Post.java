package mk.profesori.springapp.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "post")
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "post_type", discriminatorType = DiscriminatorType.STRING)
@JsonIdentityInfo(generator = JSOGGenerator.class)
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long postId;

    @Column(name = "title")
    private String title;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "custom_user_details_id")
    private CustomUserDetails author;

    @Column(name = "time_posted")
    private LocalDateTime timePosted;

    @Column(name = "time_last_edited")
    private LocalDateTime timeLastEdited;

    @ManyToOne
    @JoinColumn(name = "parent_post_id")
    private Post parent;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<PostVote> votes = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade={CascadeType.PERSIST}, fetch = FetchType.EAGER)
    private Set<PostReport> reports = new HashSet<>();

    @PreRemove
    public void preRemove() {
        reports.forEach(report -> {
            report.setPost(null);
            report.setResolved(true);
        });
    }
    @OneToMany(mappedBy = "parent", orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Post> children = new ArrayList<>();

    // konstruktor so parent (koga e reply)
    public Post(String title, String content, CustomUserDetails author, LocalDateTime timePosted,
            LocalDateTime timeLastEdited,
            Post parent, List<Post> children) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.timePosted = LocalDateTime.now();
        this.timeLastEdited = LocalDateTime.now();
        this.parent = parent;
        this.children = new ArrayList<>();
    }

    // konstruktor bez parent (koga NE e reply)
    public Post(String title, String content, CustomUserDetails author, LocalDateTime timePosted,
            LocalDateTime timeLastEdited,
            List<Post> children) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.timePosted = LocalDateTime.now();
        this.timeLastEdited = LocalDateTime.now();
        this.parent = null;
        this.children = new ArrayList<>();
    }

    @Override
    public String toString() {
        return this.postId.toString();
    }


}
