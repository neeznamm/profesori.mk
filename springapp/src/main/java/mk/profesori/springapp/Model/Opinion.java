package mk.profesori.springapp.Model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@DiscriminatorValue("opinion")
public class Opinion extends Post {

    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = false)
    private Professor targetProfessor;

    public Opinion(Long postId, String title, String content, CustomUserDetails author, LocalDateTime timePosted,
            LocalDateTime timeLastEdited, Integer upvoteCount, Integer downvoteCount, Post parent,
            List<Post> children, Professor targetProfessor) {
        super(postId, title, content, author, timePosted, timeLastEdited, upvoteCount, downvoteCount, parent, children);
        this.targetProfessor = targetProfessor;
    }

    // getters and setters
    public Professor getTargetProfessor() {
        return targetProfessor;
    }

    public void setTargetProfessor(Professor targetProfessor) {
        this.targetProfessor = targetProfessor;
    }
}
