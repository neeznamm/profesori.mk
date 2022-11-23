package mk.profesori.springapp.Repository;

import mk.profesori.springapp.Model.PostReport;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostReportRepository extends CrudRepository<PostReport,Long> {
    PostReport findByPostReportId(Long id);
    List<PostReport> findAll();
}
