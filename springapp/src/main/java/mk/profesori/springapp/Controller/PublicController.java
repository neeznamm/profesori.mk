package mk.profesori.springapp.Controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mk.profesori.springapp.Model.City;
import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.Professor;
import mk.profesori.springapp.Model.StudyProgramme;
import mk.profesori.springapp.Model.Subject;
import mk.profesori.springapp.Model.University;
import mk.profesori.springapp.Model._Thread;
import mk.profesori.springapp.Service.MainService;

@RestController
@RequestMapping("/public")
@CrossOrigin(origins = { "http://192.168.0.17:3000", "http://192.168.0.39:3000" })
public class PublicController {

    @Autowired
    private MainService mainService;

    @RequestMapping(value = "/professors", method = RequestMethod.GET)
    public List<Professor> getProfessorsByFaculty(@RequestParam Optional<Long> facultyId) {

        if (!facultyId.isPresent())
            return mainService.getAllProfessors(); // ako nema parametar facultyId gi vrakja site profesori

        return mainService.getProfessorsByFacultyId(facultyId.get());
    }

    @RequestMapping(value = "/professors/nameContains/{contained}", method = RequestMethod.GET)
    public List<Professor> getProfessorsByNameContains(@PathVariable String contained) {
        return mainService.getProfessorsByNameContains(contained); // vrakja profesori sto sodrzat "contained" vo
                                                                   // professorName
    }

    @RequestMapping(value = "/professor/{professorId}", method = RequestMethod.GET)
    public Professor getProfessorById(@PathVariable Long professorId) {
        return mainService.getProfessorById(professorId); // vrakja profesor spored id
    }

    @RequestMapping(value = "/study_programmes", method = RequestMethod.GET)
    public List<StudyProgramme> getStudyProgrammesByFaculty(@RequestParam Optional<Long> facultyId) {

        if (!facultyId.isPresent())
            return mainService.getAllStudyProgrammes(); // ako nema parametar facultyId gi vrakja site studiski programi
        return mainService.getStudyProgrammesByFacultyId(facultyId.get());
    }

    @RequestMapping(value = "/study_programme/{studyProgrammeId}", method = RequestMethod.GET)
    public StudyProgramme getStudyProgrammeById(@PathVariable Long studyProgrammeId) {
        return mainService.getStudyProgrammeById(studyProgrammeId); // vrakja studiska programa spored id
    }

    @RequestMapping(value = "/faculties", method = RequestMethod.GET)
    public List<Faculty> getFacultiesByUniversity(@RequestParam Optional<Long> universityId) {

        if (!universityId.isPresent())
            return mainService.getAllFaculties(); // ako nema parametar universityId gi vrakja site fakulteti
        return mainService.getFacultiesByUniversityId(universityId.get());
    }

    @RequestMapping(value = "/faculty/{facultyId}", method = RequestMethod.GET)
    public Faculty getFacultyById(@PathVariable Long facultyId) {
        return mainService.getFacultyById(facultyId); // vrakja fakultet spored id
    }

    @RequestMapping(value = "/universities", method = RequestMethod.GET)
    public List<University> getUniversitiesByCity(@RequestParam Optional<Long> cityId) {

        if (!cityId.isPresent())
            return mainService.getAllUniversities(); // ako nema parametar cityId gi vrakja site univerziteti
        return mainService.getUniversitiesByCityId(cityId.get());
    }

    @RequestMapping(value = "/university/{universityId}", method = RequestMethod.GET)
    public University getUniversityById(@PathVariable Long universityId) {
        return mainService.getUniversityById(universityId); // vrakja univerzitet spored id
    }

    @RequestMapping(value = "/cities", method = RequestMethod.GET)
    public List<City> getCities() {
        return mainService.getAllCities(); // gi vrakja site gradovi
    }

    @RequestMapping(value = "/city/{cityId}", method = RequestMethod.GET)
    public City getCityById(@PathVariable Long cityId) {
        return mainService.getCityById(cityId); // vrakja grad spored id
    }

    @RequestMapping(value = "/subject/{subjectId}", method = RequestMethod.GET)
    public Subject getSubjectById(@PathVariable Long subjectId) {
        return mainService.getSubjectById(subjectId); // vrakja predmet spored id
    }

    @RequestMapping(value = "/thread/{postId}", method = RequestMethod.GET)
    public _Thread getThreadById(@PathVariable Long postId) {
        return mainService.get_ThreadById(postId); // vrakja thread (tema) spored id
    }

    @RequestMapping(value = "/loginSuccessRegular", method = RequestMethod.GET)
    public Map<String, String> loginSuccessRegular(@RequestParam String sessionId) {
        return Collections.singletonMap("sessionId", sessionId);
    }

    @RequestMapping(value = "/loginSuccessModerator", method = RequestMethod.GET)
    public Map<String, String> loginSuccessModerator(@RequestParam String sessionId) {
        return Collections.singletonMap("sessionId", sessionId);
    }
}
