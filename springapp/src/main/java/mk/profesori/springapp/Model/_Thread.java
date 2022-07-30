package mk.profesori.springapp.Model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@DiscriminatorValue("thread")
public class _Thread extends Post {

    @Column(name = "tags")
    @ElementCollection
    private List<String> tags = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "section_id")
    private Section parentSection;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject targetSubject;

    // TODO threadovi
    /*
     * public _Thread(String title, String content, List<String> tags, Section
     * parentSection, Subject targetSubject) {
     * super(title, content);
     * this.tags = tags;
     * this.parentSection = parentSection;
     * this.targetSubject = targetSubject;
     * }
     */

    // getters
    public List<String> getTags() {
        return tags;
    }

    public Section getParentSection() {
        return parentSection;
    }

    public Subject getTargetSubject() {
        return targetSubject;
    }

}
