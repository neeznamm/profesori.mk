package mk.profesori.springapp.Model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "study_programme")
public class StudyProgramme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long studyProgrammeId;

    @Column(name = "name")
    private String studyProgrammeName;

    @Column(name = "cycle")
    private int cycle;

    @ManyToOne
    @JoinColumn(name = "faculty_id")
    private Faculty faculty;

    @OneToMany(mappedBy = "studyProgramme")
    private Set<Subject> subjects = new HashSet<>();

    @OneToOne(mappedBy = "relatedStudyProgramme")
    private Section relatedSection;

    //getters
    public Long getStudyProgrammeId() {
        return studyProgrammeId;
    }

    public String getStudyProgrammeName() {
        return studyProgrammeName;
    }

    public int getCycle() {
        return cycle;
    }

    @JsonBackReference
    public Faculty getFaculty() {
        return faculty;
    }

    @JsonManagedReference
    public Set<Subject> getSubjects() {
        return subjects;
    }

    @JsonManagedReference
    public Section getRelatedSection() {
        return relatedSection;
    }
}
