package mk.profesori.springapp.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mk.profesori.springapp.Repository.CityRepository;
import mk.profesori.springapp.Repository.FacultyRepository;
import mk.profesori.springapp.Repository.OpinionRepository;
import mk.profesori.springapp.Repository.ProfessorRepository;
import mk.profesori.springapp.Repository.StudyProgrammeRepository;
import mk.profesori.springapp.Repository.UniversityRepository;
import mk.profesori.springapp.Model.City;
import mk.profesori.springapp.Model.CustomUserDetails;
import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.Opinion;
import mk.profesori.springapp.Model.Professor;
import mk.profesori.springapp.Model.StudyProgramme;
import mk.profesori.springapp.Model.University;

@Service
public class MainService {

    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private StudyProgrammeRepository studyProgrammeRepository;
    @Autowired
    private FacultyRepository facultyRepository;
    @Autowired
    private UniversityRepository universityRepository;
    @Autowired
    private CityRepository cityRepository;
    @Autowired
    private OpinionRepository opinionRepository;

    public List<Professor> getAllProfessors() {

        List<Professor> list = new ArrayList<>();
        professorRepository.findAll().forEach(list::add);
        return list;
    }

    public Professor getProfessorById(Long id) {

        return professorRepository.findByProfessorId(id);
    }

    public List<Professor> getProfessorsByFacultyId(Long facultyId) {

        Faculty faculty = facultyRepository.findByFacultyId(facultyId);

        List<Professor> list = new ArrayList<>();
        professorRepository.findByFaculty(faculty).forEach(list::add);
        return list;
    }

    public List<StudyProgramme> getAllStudyProgrammes() {

        List<StudyProgramme> list = new ArrayList<>();
        studyProgrammeRepository.findAll().forEach(list::add);
        return list;
    }

    public StudyProgramme getStudyProgrammeById(Long id) {

        return studyProgrammeRepository.findByStudyProgrammeId(id);
    }

    public List<StudyProgramme> getStudyProgrammesByFacultyId(Long facultyId) {

        Faculty faculty = facultyRepository.findByFacultyId(facultyId);

        List<StudyProgramme> list = new ArrayList<>();
        studyProgrammeRepository.findByFaculty(faculty).forEach(list::add);
        return list;
    }

    public List<Faculty> getAllFaculties() {
        List<Faculty> list = new ArrayList<>();
        facultyRepository.findAll().forEach(list::add);
        return list;
    }

    public Faculty getFacultyById(Long id) {
        return facultyRepository.findByFacultyId(id);
    }

    public List<Faculty> getFacultiesByUniversityId(Long universityId) {

        University university = universityRepository.findByUniversityId(universityId);

        List<Faculty> list = new ArrayList<>();
        facultyRepository.findByUniversity(university).forEach(list::add);
        return list;
    }

    public List<University> getAllUniversities() {
        List<University> list = new ArrayList<>();
        universityRepository.findAll().forEach(list::add);
        return list;
    }

    public University getUniversityById(Long id) {
        return universityRepository.findByUniversityId(id);
    }

    public List<University> getUniversitiesByCityId(Long cityId) {

        City city = cityRepository.findByCityId(cityId);

        List<University> list = new ArrayList<>();
        universityRepository.findByCity(city).forEach(list::add);
        return list;
    }

    public List<City> getAllCities() {
        List<City> list = new ArrayList<>();
        cityRepository.findAll().forEach(list::add);
        return list;
    }

    public City getCityById(Long id) {
        return cityRepository.findByCityId(id);
    }

    public void addOpinion(String title, String content, Long professorId, CustomUserDetails currentUser) {

        Professor targetProfessor = professorRepository.findByProfessorId(professorId);

        Opinion opinionToAdd = new Opinion(title, content, currentUser, null, null,
                null, null, null, targetProfessor);

        opinionRepository.save(opinionToAdd);
    }

    public void replyToOpinion(String content, Long professorId, Long postId, CustomUserDetails currentUser) {

        Professor targetProfessor = professorRepository.findByProfessorId(professorId);
        Opinion targetOpinion = opinionRepository.findByPostId(postId);

        Opinion opinionToAdd = new Opinion(null, content, currentUser, null, null,
                null, null, targetOpinion, null, targetProfessor);
        opinionRepository.save(opinionToAdd);

        targetOpinion.getChildren().add(opinionToAdd);
        opinionRepository.save(targetOpinion);
    }
}
