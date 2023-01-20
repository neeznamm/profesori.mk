package mk.profesori.springapp.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "professor")
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long professorId;

    @Column(name = "name")
    private String professorName;

    @ManyToOne
    @JoinColumn(name = "faculty_id")
    private Faculty faculty;

    @Transient
    @OneToMany(mappedBy = "targetProfessor", cascade = CascadeType.ALL)
    private List<Opinion> relatedOpinions = new ArrayList<>();
}
