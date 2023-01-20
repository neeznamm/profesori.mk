package mk.profesori.springapp.Repository;

import mk.profesori.springapp.Model.StudyProgramme;
import mk.profesori.springapp.Model.Subject;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends CrudRepository<Subject, Long> {
    Subject findBySubjectId(Long id);
    List<Subject> findByStudyProgramme(StudyProgramme studyProgramme);
    List<Subject> findBySubjectNameContainingIgnoreCase(String name);
}
