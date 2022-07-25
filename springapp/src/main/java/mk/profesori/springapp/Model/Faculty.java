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
@Table(name = "faculty")
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

    @OneToMany(mappedBy = "faculty")
    private Set<Professor> professors = new HashSet<>();

    @OneToMany(mappedBy = "faculty")
    private Set<StudyProgramme> studyProgrammes = new HashSet<>();

    //getters
    public Long getFacultyId() {
        return facultyId;
    }

    public String getFacultyName() {
        return facultyName;
    }

    @JsonBackReference
    public University getUniversity() {
        return university;
    }

    @JsonManagedReference
    public Set<Professor> getProfessors() {
        return professors;
    }

    @JsonManagedReference
    public Set<StudyProgramme> getStudyProgrammes() {
        return studyProgrammes;
    }
    
}
