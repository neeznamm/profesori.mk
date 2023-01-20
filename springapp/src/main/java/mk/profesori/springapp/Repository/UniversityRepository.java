package mk.profesori.springapp.Repository;

import mk.profesori.springapp.Model.City;
import mk.profesori.springapp.Model.University;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniversityRepository extends CrudRepository<University, Long> {
    List<University> findAll();

    University findByUniversityId(Long id);
    List<University> findByCity(City city);
    
    @Query(value = "select facultyid, sectioncount, opinioncount from\n" +
            "(select faculty_id as facultyid, t1.subject_count+t2.professor_count as sectioncount\n" +
            "from (select sp.faculty_id, count(*) as subject_count\n" +
            "      from subject s join study_programme sp on s.study_programme_id = sp.id\n" +
            "      group by sp.faculty_id) as t1\n" +
            "         natural join\n" +
            "     (select count(*) as professor_count, f.id as faculty_id\n" +
            "      from professor p join faculty f on f.id = p.faculty_id\n" +
            "      group by f.id) as t2) as q1\n" +
            "natural join\n" +
            "(select facultyid, count1+count2 as opinioncount from\n" +
            "    (select pr.faculty_id as facultyid, count(*) as count1\n" +
            "    from post po join professor pr on po.professor_id = pr.id\n" +
            "    where professor_id is not null\n" +
            "    group by pr.faculty_id) as t3\n" +
            "    natural join\n" +
            "    (select sp.faculty_id as facultyid, count(*) as count2\n" +
            "    from post po join subject s on po.subject_id = s.id join study_programme sp on s.study_programme_id = sp.id\n" +
            "    where po.subject_id is not null\n" +
            "    group by sp.faculty_id) as t4) as q2;", nativeQuery = true)
    List<String> findSectionAndPostCount();
}
