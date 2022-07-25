package mk.profesori.springapp.Model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "city")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long cityId;

    @Column(name = "name")
    private String cityName;

    @OneToMany(mappedBy = "city")
    private Set<University> universities = new HashSet<>();

    //getters
    public Long getCityId() {
        return cityId;
    }

    public String getCityName() {
        return cityName;
    }

    @JsonManagedReference
    public Set<University> getUniversities() {
        return universities;
    }
    
}
