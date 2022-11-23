package mk.profesori.springapp.Model;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
public class PostReport {

    @Id
    @SequenceGenerator(name = "post_report_sequence", sequenceName = "post_report_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_report_sequence")
    private Long postReportId;

    @ManyToOne
    @JoinColumn(name = "custom_user_details_id")
    private CustomUserDetails user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    LocalDateTime time;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "resolved")
    private boolean resolved;

    public PostReport(CustomUserDetails user, Post post, String description) {
        this.user = user;
        this.post = post;
        this.time = LocalDateTime.now();
        this.description = description;
        this.resolved=false;
    }

    public boolean isResolved() {
        return resolved;
    }

    public void setResolved(boolean resolved) {
        this.resolved = resolved;
    }

    public Long getPostReportId() {
        return postReportId;
    }

    public void setPostReportId(Long postReportId) {
        this.postReportId = postReportId;
    }

    public CustomUserDetails getUser() {
        return user;
    }

    public void setUser(CustomUserDetails user) {
        this.user = user;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}