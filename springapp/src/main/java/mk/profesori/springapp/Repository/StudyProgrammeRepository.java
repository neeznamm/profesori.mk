package mk.profesori.springapp.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.StudyProgramme;


@Repository
public interface StudyProgrammeRepository extends CrudRepository<StudyProgramme, Long>{
    
    public List<StudyProgramme> findAll();
    public StudyProgramme findByStudyProgrammeId(Long id);
    public List<StudyProgramme> findByFaculty(Faculty faculty);
}
