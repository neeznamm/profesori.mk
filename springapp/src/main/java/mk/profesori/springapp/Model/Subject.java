package mk.profesori.springapp.Model;

import java.util.ArrayList;
import java.util.List;
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

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

@Entity
@Table(name = "subject")
@JsonIdentityInfo(generator = JSOGGenerator.class)
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

    // getters
    public Long getSubjectId() {
        return subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public StudyProgramme getStudyProgramme() {
        return studyProgramme;
    }

    public List<_Thread> getThreads() {
        return threads;
    }

}
