package mk.profesori.springapp.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.StudyProgramme;


@Repository
public interface StudyProgrammeRepository extends CrudRepository<StudyProgramme, Long>{
    
    List<StudyProgramme> findAll();
    StudyProgramme findByStudyProgrammeId(Long id);
    List<StudyProgramme> findByFaculty(Faculty faculty);
}
