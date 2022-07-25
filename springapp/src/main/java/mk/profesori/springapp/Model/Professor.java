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

@Entity
@Table(name = "professor")
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

    //getters
    public Long getProfessorId() {
        return professorId;
    }

    public String getProfessorName() {
        return professorName;
    }

    @JsonBackReference
    public Faculty getFaculty() {
        return faculty;
    }
}
