package mk.profesori.springapp.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "faculty")
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long facultyId;

    @Column(name = "name")
    private String facultyName;

    @ManyToOne
    @JoinColumn(name = "university_id")
    private University university;

    @Transient
    @OneToMany(mappedBy = "faculty")
    private Set<Professor> professors = new HashSet<>();

    @Transient
    @OneToMany(mappedBy = "faculty")
    private Set<StudyProgramme> studyProgrammes = new HashSet<>();

}
