package mk.profesori.springapp.Model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@DiscriminatorValue("opinion")
@NoArgsConstructor
public class Opinion extends Post {

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Professor targetProfessor;

    // konstruktor so parent (koga e reply)
    public Opinion(String title, String content, CustomUserDetails author, LocalDateTime timePosted,
            LocalDateTime timeLastEdited,
            Post parent, List<Post> children, Professor targetProfessor) {
        super(title, content, author, timePosted, timeLastEdited, parent, children);
        this.targetProfessor = targetProfessor;
    }

    // konstruktor bez parent (koga NE e reply)
    public Opinion(String title, String content, CustomUserDetails author, LocalDateTime timePosted,
            LocalDateTime timeLastEdited,
            List<Post> children, Professor targetProfessor) {
        super(title, content, author, timePosted, timeLastEdited, children);
        this.targetProfessor = targetProfessor;
    }
}
