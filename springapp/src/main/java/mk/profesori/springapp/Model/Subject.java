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
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "subject")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long subjectId;

    @Column(name = "name")
    private String subjectName;

    @ManyToOne
    @JoinColumn(name = "study_programme_id")
    private StudyProgramme studyProgramme;

    //getters
    public Long getSubjectId() {
        return subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    @JsonBackReference
    public StudyProgramme getStudyProgramme() {
        return studyProgramme;
    }
    
}
