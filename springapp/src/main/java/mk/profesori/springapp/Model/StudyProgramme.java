package mk.profesori.springapp.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "study_programme")
@JsonIdentityInfo(generator = JSOGGenerator.class)
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

    @Transient
    @OneToMany(mappedBy = "studyProgramme")
    private Set<Subject> subjects = new HashSet<>();

}
