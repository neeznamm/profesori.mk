package mk.profesori.springapp.Model;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
public class PostVote {

    @Id
    @SequenceGenerator(name = "post_vote_sequence", sequenceName = "post_vote_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_vote_sequence")
    private Long postVoteId;

    @ManyToOne
    @JoinColumn(name = "custom_user_details_id")
    private CustomUserDetails user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    LocalDateTime time;

    @Enumerated(EnumType.STRING)
    private VoteType vote;

    public PostVote(CustomUserDetails user, Post post, VoteType vote) {
        this.user = user;
        this.post = post;
        this.time = LocalDateTime.now();
        this.vote = vote;
    }

    public Long getPostVoteId() {
        return postVoteId;
    }

    public void setPostVoteId(Long id) {
        this.postVoteId = id;
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

    public VoteType getVote() {
        return vote;
    }

    public void setVote(VoteType vote) {
        this.vote = vote;
    }
}