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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "sectionId")
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long sectionId;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "parentSection", cascade = CascadeType.ALL)
    private List<_Thread> threads = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "study_programme_id", referencedColumnName = "id")
    private StudyProgramme relatedStudyProgramme;

    // getters and setters
    public Long getSectionId() {
        return sectionId;
    }

    public void setSectionId(Long sectionId) {
        this.sectionId = sectionId;
    }

    public List<_Thread> getThreads() {
        return threads;
    }

    public void setThreads(List<_Thread> threads) {
        this.threads = threads;
    }

    public StudyProgramme getRelatedStudyProgramme() {
        return relatedStudyProgramme;
    }

    public void setRelatedStudyProgramme(StudyProgramme relatedStudyProgramme) {
        this.relatedStudyProgramme = relatedStudyProgramme;
    }

    public Section(Long sectionId, List<_Thread> threads, StudyProgramme relatedStudyProgramme) {
        this.sectionId = sectionId;
        this.threads = threads;
        this.relatedStudyProgramme = relatedStudyProgramme;
    }

}
