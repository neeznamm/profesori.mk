package mk.profesori.springapp.Repository;

import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.University;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyRepository extends CrudRepository<Faculty, Long>{
    List<Faculty> findAll();
    Faculty findByFacultyId(Long id);
    List<Faculty> findByUniversity(University university);
    @Query(value = "select professor.id, count(p.*)\n" +
            "from professor left join post p on professor.id = p.professor_id\n" +
            "where professor.faculty_id = :facultyId\n" +
            "group by professor.id\n" +
            "order by professor.id;", nativeQuery = true)
    List<String> getOpinionCountForEachProfessorInFaculty(@Param("facultyId") Long id);
}
