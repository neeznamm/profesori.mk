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
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="university")
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

    @OneToMany(mappedBy = "university")
    private Set<Faculty> faculties = new HashSet<>();

    //getters
    public Long getUniversityId() {
        return universityId;
    }

    public String getUniversityName() {
        return universityName;
    }

    @JsonBackReference
    public City getCity() {
        return city;
    }

    @JsonManagedReference
    public Set<Faculty> getFaculties() {
        return faculties;
    }
    
}
