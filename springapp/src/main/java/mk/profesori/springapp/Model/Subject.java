package mk.profesori.springapp.Model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
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
import com.fasterxml.jackson.annotation.JsonManagedReference;

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

    @OneToMany(mappedBy = "targetSubject", cascade = CascadeType.ALL)
    private List<_Thread> threads = new ArrayList<>();

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

    @JsonManagedReference
    public List<_Thread> getThreads() {
        return threads;
    }
    
}
