package mk.profesori.springapp.Controller;

import mk.profesori.springapp.Model.*;
import mk.profesori.springapp.Service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/public")
@CrossOrigin(origins = { "http://192.168.1.108:3000", "http://192.168.0.28:3000" })
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
        return mainService.getProfessorsByNameContains(contained); // vrakja profesori sto sodrzat "contained" vo imeto

    }

    @RequestMapping(value = "/subjects/nameContains/{contained}", method = RequestMethod.GET)
    public List<Subject> getSubjectsByNameContains(@PathVariable String contained) {
        return mainService.getSubjectsByNameContains(contained); // vrakja predmeti sto sodrzat "contained" vo imeto
    }

    @RequestMapping(value = "/professor/{professorId}", method = RequestMethod.GET)
    public Professor getProfessorById(@PathVariable Long professorId) {
        return mainService.getProfessorById(professorId); // vrakja profesor spored id
    }

    @RequestMapping(value="/professor/{professorId}/relatedOpinions", method = RequestMethod.GET)
    public List<Opinion> getRelatedOpinions(@PathVariable Long professorId) {
        return mainService.getRelatedOpinions(professorId);
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

    @RequestMapping(value = "/subjects", method = RequestMethod.GET)
    public List<Subject> getSubjectsByStudyProgramme(@RequestParam Long studyProgrammeId) {
        return mainService.getSubjectsByStudyProgramme(studyProgrammeId);
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

    @RequestMapping(value = "/latest10opinions", method = RequestMethod.GET)
    public List<Opinion> latest10opinions() {
        return mainService.getLatest10Opinions();
    }

    @RequestMapping(value = "/latest10threads", method = RequestMethod.GET)
    public List<_Thread> latest10threads() {
        return mainService.getLatest10Threads();
    }

    @RequestMapping(value = "/subject/{id}/threads")
    public List<_Thread> getThreadsBySubject(@PathVariable Long id) {
        return mainService.getThreadsBySubject(id);
    }

    @RequestMapping(value = "/university/{id}/sectionAndPostCount")
    public List<String> getUniversitySectionCount(@PathVariable Long id) {
        return mainService.getUniversitySectionAndPostCount();
    }

    @RequestMapping(value = "/faculty/{id}/opinionCountForEachProfessor")
    public List<String> getOpinionCountForEachProfessorInFaculty(@PathVariable Long id) {
        return mainService.getOpinionCountForEachProfessorInFaculty(id);
    }

    @RequestMapping(value = "/study_programme/{id}/threadCountForEachSubject")
    public List<String> getThreadCountForEachSubjectInStudyProgramme(@PathVariable Long id) {
        return mainService.getThreadCountForEachSubjectInStudyProgramme(id);
    }

    @RequestMapping(value = "/user/{id}")
    public CustomUserDetails getPublicUserProfile(@PathVariable Long id) {
        return mainService.getPublicUserProfile(id);
    }

}
