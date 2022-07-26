package mk.profesori.springapp.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mk.profesori.springapp.Model.City;
import mk.profesori.springapp.Model.Faculty;
import mk.profesori.springapp.Model.Professor;
import mk.profesori.springapp.Model.StudyProgramme;
import mk.profesori.springapp.Model.University;
import mk.profesori.springapp.Service.MainService;

@RestController
public class MainController {
    
    @Autowired
    private MainService mainService;

    @RequestMapping(value = "/professors", method = RequestMethod.GET)
    public List<Professor> getProfessorsByFaculty(@RequestParam Optional<Long> facultyId) {

        if(!facultyId.isPresent()) return mainService.getAllProfessors(); //ako nema parametar facultyId gi vrakja site profesori
        return mainService.getProfessorsByFacultyId(facultyId.get());
    }

    @RequestMapping(value = "/professor/{professorId}", method = RequestMethod.GET)
    public Professor getProfessorById(@PathVariable Long professorId) {
        return mainService.getProfessorById(professorId);   //vrakja profesor spored id
    }

    @RequestMapping(value = "/study_programmes", method = RequestMethod.GET)
    public List<StudyProgramme> getStudyProgrammesByFaculty(@RequestParam Optional<Long> facultyId) {

        if(!facultyId.isPresent()) return mainService.getAllStudyProgrammes(); //ako nema parametar facultyId gi vrakja site studiski programi
        return mainService.getStudyProgrammesByFacultyId(facultyId.get());
    }

    @RequestMapping(value = "/study_programme/{studyProgrammeId}", method = RequestMethod.GET)
    public StudyProgramme getStudyProgrammeById(@PathVariable Long studyProgrammeId) {
        return mainService.getStudyProgrammeById(studyProgrammeId);   //vrakja studiska programa spored id
    }

    @RequestMapping(value = "/faculties", method = RequestMethod.GET)
    public List<Faculty> getFacultiesByUniversity(@RequestParam Optional<Long> universityId) {

        if(!universityId.isPresent()) return mainService.getAllFaculties(); //ako nema parametar universityId gi vrakja site fakulteti
        return mainService.getFacultiesByUniversityId(universityId.get());
    }

    @RequestMapping(value = "/faculty/{facultyId}", method = RequestMethod.GET)
    public Faculty getFacultyById(@PathVariable Long facultyId) {
        return mainService.getFacultyById(facultyId); //vrakja fakultet spored id
    }

    @RequestMapping(value = "/universities", method = RequestMethod.GET)
    public List<University> getUniversitiesByCity(@RequestParam Optional<Long> cityId) {

        if(!cityId.isPresent()) return mainService.getAllUniversities(); //ako nema parametar cityId gi vrakja site univerziteti
        return mainService.getUniversitiesByCityId(cityId.get());
    }

    @RequestMapping(value = "/university/{universityId}", method = RequestMethod.GET)
    public University getUniversityById(@PathVariable Long universityId) {
        return mainService.getUniversityById(universityId); //vrakja univerzitet spored id
    }

    @RequestMapping(value = "/cities", method = RequestMethod.GET)
    public List<City> getCities() {
        return mainService.getAllCities();  //gi vrakja site gradovi
    }

    @RequestMapping(value = "/city/{cityId}", method = RequestMethod.GET)
    public City getCityById(@PathVariable Long cityId) {
        return mainService.getCityById(cityId); //vrakja grad spored id
    }

}
