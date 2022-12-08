package mk.profesori.springapp.Service;

import mk.profesori.springapp.Model.*;
import mk.profesori.springapp.Repository.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MainService {

    private final ProfessorRepository professorRepository;
    private final StudyProgrammeRepository studyProgrammeRepository;
    private final FacultyRepository facultyRepository;
    private final UniversityRepository universityRepository;
    private final CityRepository cityRepository;
    private final OpinionRepository opinionRepository;
    private final _ThreadRepository _threadRepository;
    private final SubjectRepository subjectRepository;
    private final PostVoteRepository postVoteRepository;
    private final UserRepository userRepository;
    private final PostReportRepository postReportRepository;

    public MainService(ProfessorRepository professorRepository, StudyProgrammeRepository studyProgrammeRepository, FacultyRepository facultyRepository, UniversityRepository universityRepository, CityRepository cityRepository, OpinionRepository opinionRepository, _ThreadRepository _threadRepository, SubjectRepository subjectRepository, PostVoteRepository postVoteRepository, UserRepository userRepository, PostReportRepository postReportRepository) {
        this.professorRepository = professorRepository;
        this.studyProgrammeRepository = studyProgrammeRepository;
        this.facultyRepository = facultyRepository;
        this.universityRepository = universityRepository;
        this.cityRepository = cityRepository;
        this.opinionRepository = opinionRepository;
        this._threadRepository = _threadRepository;
        this.subjectRepository = subjectRepository;
        this.postVoteRepository = postVoteRepository;
        this.userRepository = userRepository;
        this.postReportRepository = postReportRepository;
    }

    public List<Professor> getAllProfessors() {

        return new ArrayList<>(professorRepository.findAll());
    }

    public Professor getProfessorById(Long id) {

        return professorRepository.findByProfessorId(id);
    }

    public List<Professor> getProfessorsByFacultyId(Long facultyId) {

        Faculty faculty = facultyRepository.findByFacultyId(facultyId);

        return new ArrayList<>(professorRepository.findByFaculty(faculty));
    }

    public List<Professor> getProfessorsByNameContains(String contained) {
        return new ArrayList<>(professorRepository.findByProfessorNameContainingIgnoreCase(contained));
    }

    public List<StudyProgramme> getAllStudyProgrammes() {

        return new ArrayList<>(studyProgrammeRepository.findAll());
    }

    public StudyProgramme getStudyProgrammeById(Long id) {

        return studyProgrammeRepository.findByStudyProgrammeId(id);
    }

    public List<StudyProgramme> getStudyProgrammesByFacultyId(Long facultyId) {

        Faculty faculty = facultyRepository.findByFacultyId(facultyId);

        return new ArrayList<>(studyProgrammeRepository.findByFaculty(faculty));
    }

    public List<Faculty> getAllFaculties() {
        return new ArrayList<>(facultyRepository.findAll());
    }

    public Faculty getFacultyById(Long id) {
        return facultyRepository.findByFacultyId(id);
    }

    public List<Faculty> getFacultiesByUniversityId(Long universityId) {

        University university = universityRepository.findByUniversityId(universityId);

        return new ArrayList<>(facultyRepository.findByUniversity(university));
    }

    public List<University> getAllUniversities() {
        return new ArrayList<>(universityRepository.findAll());
    }

    public University getUniversityById(Long id) {
        return universityRepository.findByUniversityId(id);
    }

    public List<University> getUniversitiesByCityId(Long cityId) {

        City city = cityRepository.findByCityId(cityId);

        return new ArrayList<>(universityRepository.findByCity(city));
    }

    public List<City> getAllCities() {
        return new ArrayList<>(cityRepository.findAll());
    }

    public City getCityById(Long id) {
        return cityRepository.findByCityId(id);
    }

    public void addOpinion(String content, Long professorId, CustomUserDetails currentUser) {

        Professor targetProfessor = professorRepository.findByProfessorId(professorId);

        Opinion opinionToAdd = new Opinion(null, content, currentUser, null, null,
                null, targetProfessor);

        opinionRepository.save(opinionToAdd);
    }

    public void replyToOpinion(String content, Long professorId, Long postId, CustomUserDetails currentUser) {

        Professor targetProfessor = professorRepository.findByProfessorId(professorId);
        Opinion targetOpinion = opinionRepository.findByPostId(postId);

        Opinion opinionToAdd = new Opinion(null, content, currentUser, null, null,
                targetOpinion, null, targetProfessor);
        opinionRepository.save(opinionToAdd);

        //mozda ne treba
        targetOpinion.getChildren().add(opinionToAdd);
        opinionRepository.save(targetOpinion);
    }

    public void addThread(String title, String content, Long subjectId, CustomUserDetails currentUser) {
        Subject targetSubject = subjectRepository.findBySubjectId(subjectId);
        String titleToSet = title.equals("") ? null : title;

        _Thread _threadToAdd = new _Thread(titleToSet, content, currentUser, null, null, null, targetSubject);
        _threadRepository.save(_threadToAdd);
    }

    public void replyToThread(String content, Long subjectId, Long postId, CustomUserDetails currentUser) {
        Subject targetSubject = subjectRepository.findBySubjectId(subjectId);
        _Thread target_Thread = _threadRepository.findByPostId(postId);

        _Thread _threadToAdd = new _Thread(null, content, currentUser, null, null, target_Thread, null, targetSubject);
        _threadRepository.save(_threadToAdd);

        //mozda ne treba
        target_Thread.getChildren().add(_threadToAdd);
        _threadRepository.save(target_Thread);
    }

    public Subject getSubjectById(Long subjectId) {
        return subjectRepository.findBySubjectId(subjectId);
    }

    public _Thread get_ThreadById(Long postId) {
        return _threadRepository.findByPostId(postId);
    }

    public void upvoteOpinion(Long postId, CustomUserDetails currentUser) {
        Post targetPost = opinionRepository.findByPostId(postId);
        PostVote voteToAdd = new PostVote(currentUser, targetPost, VoteType.UPVOTE);
        postVoteRepository.save(voteToAdd);
        targetPost.getAuthor().setKarma(targetPost.getAuthor().getKarma()+1);
        userRepository.save(targetPost.getAuthor());
    }
    public void downvoteOpinion(Long postId, CustomUserDetails currentUser) {
        Post targetPost = opinionRepository.findByPostId(postId);
        PostVote voteToAdd = new PostVote(currentUser, targetPost, VoteType.DOWNVOTE);
        postVoteRepository.save(voteToAdd);
        targetPost.getAuthor().setKarma(targetPost.getAuthor().getKarma()-1);
        userRepository.save(targetPost.getAuthor());
    }

    public void upvote_Thread(Long postId, CustomUserDetails currentUser) {
        Post targetPost = _threadRepository.findByPostId(postId);
        PostVote voteToAdd = new PostVote(currentUser, targetPost, VoteType.UPVOTE);
        postVoteRepository.save(voteToAdd);
        targetPost.getAuthor().setKarma(targetPost.getAuthor().getKarma()+1);
        userRepository.save(targetPost.getAuthor());
    }
    public void downvote_Thread(Long postId, CustomUserDetails currentUser) {
        Post targetPost = _threadRepository.findByPostId(postId);
        PostVote voteToAdd = new PostVote(currentUser, targetPost, VoteType.DOWNVOTE);
        postVoteRepository.save(voteToAdd);
        targetPost.getAuthor().setKarma(targetPost.getAuthor().getKarma()-1);
        userRepository.save(targetPost.getAuthor());
    }

    public void deleteOpinion(Long postId) {opinionRepository.deleteById(postId);}
    public void delete_Thread(Long postId) {_threadRepository.deleteById(postId);}

    public String updateOpinion(String newContent, Long newTargetProfessorId, Long newParentPostId, Long postId) {
        Opinion opinionToUpdate = opinionRepository.findByPostId(postId);

        opinionToUpdate.setContent(newContent);

        Professor newTargetProfessor = professorRepository.findByProfessorId(newTargetProfessorId);
        opinionToUpdate.setTargetProfessor(newTargetProfessor);

        Opinion newParentOpinion = null;
        if (newParentPostId != -1) {
            newParentOpinion = opinionRepository.findByPostId(newParentPostId);
            if (!newParentOpinion.getTargetProfessor().equals(newTargetProfessor))
                throw new IncompatiblePostId("Мислењето не припаѓа во специфицираната секција за дискусија.");
            if (opinionToUpdate.getChildren().contains(newParentOpinion))
                throw new DisallowedOperationException("Мислењето не може да се постави како дете на негово дете (бесконечна рекурзија)");
        }
        opinionToUpdate.setParent(newParentOpinion);

        for(Post p : opinionToUpdate.getChildren()) {
            Opinion o = (Opinion) p;
            o.setTargetProfessor(newTargetProfessor);
        }
        opinionToUpdate.setTimeLastEdited(LocalDateTime.now());
        opinionRepository.save(opinionToUpdate);
        return null;
    }

    public String update_Thread(String newTitle, String newContent, Long newTargetSubjectId, Long newParentThreadId, Long postId) {
        _Thread _threadToUpdate = _threadRepository.findByPostId(postId);

        _threadToUpdate.setContent(newContent);

        Subject newTargetSubject = subjectRepository.findBySubjectId(newTargetSubjectId);
        _threadToUpdate.setTargetSubject(newTargetSubject);

        _Thread newParentThread = null;
        if(newParentThreadId != -1) {
            newParentThread = _threadRepository.findByPostId(newParentThreadId);
            if (!newParentThread.getTargetSubject().equals(newTargetSubject))
                throw new IncompatiblePostId("Мислењето не припаѓа во специфицираната секција за дискусија.");
            if (_threadToUpdate.getChildren().contains(newParentThread))
                throw new DisallowedOperationException("Мислењето не може да се постави како дете на негово дете (бесконечна рекурзија)");
        }
        _threadToUpdate.setParent(newParentThread);

            if(_threadToUpdate.getParent() == null) {
             _threadToUpdate.setTitle(newTitle);
            } else {
                _threadToUpdate.setTitle(null);
            }

         for(Post p : _threadToUpdate.getChildren()) {
                _Thread t = (_Thread) p;
                t.setTargetSubject(newTargetSubject);
            }
         _threadToUpdate.setTimeLastEdited(LocalDateTime.now());
          _threadRepository.save(_threadToUpdate);
          return null;
    }

    public void lockUser(Long userId) {
        CustomUserDetails user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("Invalid userId"));
        user.setLocked(true);
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }


    public void updateUserFullName(String newFullName, Long userId) {
        CustomUserDetails user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("Invalid userId"));
        user.setFullName(newFullName);
        userRepository.save(user);
    }

    public void updateUserUsername(String newUsername, Long userId) {
        CustomUserDetails user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("Invalid userId"));
        user.setUsername(newUsername);
        userRepository.save(user);
    }


    public void reportOpinion(Long postId, CustomUserDetails currentUser, String description) {
            Post targetPost = opinionRepository.findByPostId(postId);
            PostReport reportToAdd = new PostReport(currentUser, targetPost, description);
            postReportRepository.save(reportToAdd);
    }

    public void markReport(Long postReportId, String action) {
        PostReport report = postReportRepository.findByPostReportId(postReportId);
        if (action.equals("resolve")) report.setResolved(true);
        else if (action.equals("open")) report.setResolved(false);
        postReportRepository.save(report);
     }

    public List<PostReport> getAllPostReports() {
        return postReportRepository.findAll();
    }

    public void reportThread(Long postId, CustomUserDetails currentUser, String description) {
        Post targetPost = _threadRepository.findByPostId(postId);
        PostReport reportToAdd = new PostReport(currentUser, targetPost, description);
        postReportRepository.save(reportToAdd);
    }
}
