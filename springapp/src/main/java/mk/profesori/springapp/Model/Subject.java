package mk.profesori.springapp.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
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

    @Transient
    @OneToMany(mappedBy = "targetSubject", cascade = CascadeType.ALL)
    private List<_Thread> threads = new ArrayList<>();

}
