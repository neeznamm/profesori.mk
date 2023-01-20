package mk.profesori.springapp.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "university")
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class University {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long universityId;

    @Column(name = "name")
    private String universityName;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @Transient
    @OneToMany(mappedBy = "university")
    private Set<Faculty> faculties = new HashSet<>();
}
