package mk.profesori.springapp.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "city")
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long cityId;

    @Column(name = "name")
    private String cityName;

    @Transient
    @OneToMany(mappedBy = "city")
    private Set<University> universities = new HashSet<>();

}
