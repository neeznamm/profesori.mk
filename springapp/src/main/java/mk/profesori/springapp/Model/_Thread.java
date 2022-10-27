package mk.profesori.springapp.Model;

import java.time.LocalDateTime;

import java.util.List;

import javax.persistence.DiscriminatorValue;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("thread")
@NoArgsConstructor
public class _Thread extends Post {

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject targetSubject;

    // konstruktor so parent (koga e reply)
    public _Thread(String title, String content, CustomUserDetails author, LocalDateTime timePosted,
            LocalDateTime timeLastEdited,
            Post parent, List<Post> children, Subject targetSubject) {
        super(title, content, author, timePosted, timeLastEdited, parent, children);
        this.targetSubject = targetSubject;
    }

    // konstruktor bez parent (koga NE e reply)
    public _Thread(String title, String content, CustomUserDetails author, LocalDateTime timePosted,
            LocalDateTime timeLastEdited, List<Post> children, Subject targetSubject) {
        super(title, content, author, timePosted, timeLastEdited, children);
        this.targetSubject = targetSubject;
    }

    public Subject getTargetSubject() {
        return targetSubject;
    }

}
