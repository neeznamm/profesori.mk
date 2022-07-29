package mk.profesori.springapp.Model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("opinion")
@NoArgsConstructor
public class Opinion extends Post {

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Professor targetProfessor;

    // konstruktor so parent (koga e reply)
    public Opinion(String title, String content, CustomUserDetails author, LocalDateTime timePosted,
            LocalDateTime timeLastEdited,
            Integer upvoteCount, Integer downvoteCount, Post parent, List<Post> children, Professor targetProfessor) {
        super(title, content, author, timePosted, timeLastEdited, upvoteCount, downvoteCount, parent, children);
        this.targetProfessor = targetProfessor;
    }

    // konstruktor bez parent (koga NE e reply)
    public Opinion(String title, String content, CustomUserDetails author, LocalDateTime timePosted,
            LocalDateTime timeLastEdited,
            Integer upvoteCount, Integer downvoteCount, List<Post> children, Professor targetProfessor) {
        super(title, content, author, timePosted, timeLastEdited, upvoteCount, downvoteCount, children);
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
