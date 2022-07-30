package mk.profesori.springapp.Model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.DiscriminatorType;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

import lombok.NoArgsConstructor;

@Entity(name = "post")
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

    @Column(name = "upvote_count")
    private Integer upvoteCount;

    @Column(name = "downvote_count")
    private Integer downvoteCount;

    @ManyToOne
    @JoinColumn(name = "parent_post_id", nullable = true)
    private Post parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Post> children = new ArrayList<>();

    // getters and setters
    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public CustomUserDetails getAuthor() {
        return author;
    }

    public void setAuthor(CustomUserDetails author) {
        this.author = author;
    }

    public LocalDateTime getTimePosted() {
        return timePosted;
    }

    public void setTimePosted(LocalDateTime timePosted) {
        this.timePosted = timePosted;
    }

    public LocalDateTime getTimeLastEdited() {
        return timeLastEdited;
    }

    public void setTimeLastEdited(LocalDateTime timeLastEdited) {
        this.timeLastEdited = timeLastEdited;
    }

    public Integer getUpvoteCount() {
        return upvoteCount;
    }

    public void setUpvoteCount(Integer upvoteCount) {
        this.upvoteCount = upvoteCount;
    }

    public Integer getDownvoteCount() {
        return downvoteCount;
    }

    public void setDownvoteCount(Integer downvoteCount) {
        this.downvoteCount = downvoteCount;
    }

    public Post getParent() {
        return parent;
    }

    public void setParent(Post parent) {
        this.parent = parent;
    }

    public List<Post> getChildren() {
        return children;
    }

    public void setChildren(List<Post> children) {
        this.children = children;
    }

    // konstruktor so parent (koga e reply)
    public Post(String title, String content, CustomUserDetails author, LocalDateTime timePosted,
            LocalDateTime timeLastEdited,
            Integer upvoteCount, Integer downvoteCount, Post parent, List<Post> children) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.timePosted = LocalDateTime.now();
        this.timeLastEdited = LocalDateTime.now();
        this.upvoteCount = 0;
        this.downvoteCount = 0;
        this.parent = parent;
        this.children = new ArrayList<>();
    }

    // konstruktor bez parent (koga NE e reply)
    public Post(String title, String content, CustomUserDetails author, LocalDateTime timePosted,
            LocalDateTime timeLastEdited,
            Integer upvoteCount, Integer downvoteCount, List<Post> children) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.timePosted = LocalDateTime.now();
        this.timeLastEdited = LocalDateTime.now();
        this.upvoteCount = 0;
        this.downvoteCount = 0;
        this.parent = null;
        this.children = new ArrayList<>();
    }

}
