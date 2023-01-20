package mk.profesori.springapp.Repository;

import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.StudyProgramme;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface StudyProgrammeRepository extends CrudRepository<StudyProgramme, Long>{
    List<StudyProgramme> findAll();
    StudyProgramme findByStudyProgrammeId(Long id);
    List<StudyProgramme> findByFaculty(Faculty faculty);
    @Query(value = "select subject.id, count(p.*)\n" +
            "from subject left join post p on subject.id = p.subject_id\n" +
            "where subject.study_programme_id = :studyProgrammeId\n" +
            "group by subject.id\n" +
            "order by subject.id;", nativeQuery = true)
    List<String> getThreadCountForEachSubjectInStudyProgramme(@Param("studyProgrammeId") Long id);
}
