package mk.profesori.springapp.Model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
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
}