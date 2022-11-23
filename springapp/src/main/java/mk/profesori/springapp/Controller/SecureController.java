package mk.profesori.springapp.Controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import mk.profesori.springapp.Model.CustomUserDetails;
import mk.profesori.springapp.Model.PostReport;
import mk.profesori.springapp.Model.UserRole;
import mk.profesori.springapp.Service.CustomUserDetailsService;
import mk.profesori.springapp.Service.MainService;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/secure")
@CrossOrigin(origins = { "http://192.168.0.19:3000", "http://192.168.0.39:3000" })
public class SecureController {

    private final MainService mainService;
    final CustomUserDetailsService customUserDetailsService;

    public SecureController(MainService mainService, CustomUserDetailsService customUserDetailsService) {
        this.mainService = mainService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @RequestMapping(value = "/professor/{professorId}/addOpinion", method = RequestMethod.POST)
    public void addOpinion(@RequestBody ObjectNode objectNode, @PathVariable Long professorId,
            @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser) {
            String content = objectNode.get("content").asText();
            mainService.addOpinion(content, professorId, currentUser);
        }
    }

    @RequestMapping(value = "/professor/{professorId}/replyToOpinion/{postId}", method = RequestMethod.POST)
    public void replyToOpinion(@RequestBody ObjectNode objectNode, @PathVariable Long professorId,
            @PathVariable Long postId, @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser) {
            String content = objectNode.get("content").asText();
            mainService.replyToOpinion(content, professorId, postId, currentUser);
        }
    }

    @RequestMapping(value = "/subject/{subjectId}/addThread", method = RequestMethod.POST)
    public void addThread(@RequestBody ObjectNode objectNode, @PathVariable Long subjectId,
            @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser) {
            String title = objectNode.get("title").asText();
            String content = objectNode.get("content").asText();
            mainService.addThread(title, content, subjectId, currentUser);
        }
    }

    @RequestMapping(value = "/subject/{subjectId}/replyToThread/{postId}", method = RequestMethod.POST)
    public void replyToThread(@RequestBody ObjectNode objectNode, @PathVariable Long subjectId,
            @PathVariable Long postId, @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser) {
            String content = objectNode.get("content").asText();
            mainService.replyToThread(content, subjectId, postId, currentUser);
        }
    }

    @RequestMapping(value = "/currentUser", method = RequestMethod.GET)
    public UserDetails getUserDetails(@CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser) {
            return customUserDetailsService.loadUserByUsername(currentUser.getEmail());
        }
        return null;
    }

    @RequestMapping(value = "/upvoteOpinion/{postId}", method = RequestMethod.GET)
    public void upvoteOpinion(@PathVariable Long postId, @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser) {
            mainService.upvoteOpinion(postId, currentUser);
        }
    }

    @RequestMapping(value = "/downvoteOpinion/{postId}", method = RequestMethod.GET)
    public void downvoteOpinion(@PathVariable Long postId, @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser) {
            mainService.downvoteOpinion(postId, currentUser);
        }
    }

    @RequestMapping(value = "/upvoteThread/{postId}", method = RequestMethod.GET)
    public void upvoteThread(@PathVariable Long postId, @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser) {
            mainService.upvote_Thread(postId, currentUser);
        }
    }

    @RequestMapping(value = "/downvoteThread/{postId}", method = RequestMethod.GET)
    public void downvoteThread(@PathVariable Long postId, @CurrentSecurityContext SecurityContext context) {

        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser) {
            mainService.downvote_Thread(postId, currentUser);
        }
    }

    @RequestMapping(value = "/deleteOpinion/{postId}", method = RequestMethod.DELETE)
    public void deleteOpinion(@PathVariable Long postId, @CurrentSecurityContext SecurityContext context)
            throws Exception {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser
                && currentUser.getUserRole().equals(UserRole.MODERATOR)) {
            mainService.deleteOpinion(postId);
        } else
            throw new AuthenticationException("Auth exception");
    }

    @RequestMapping(value = "/deleteThread/{postId}", method = RequestMethod.DELETE)
    public void deleteThread(@PathVariable Long postId, @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser
                && currentUser.getUserRole().equals(UserRole.MODERATOR)) {
            mainService.delete_Thread(postId);
        }
    }

    @RequestMapping(value = "/updateOpinion/{postId}", method = RequestMethod.PUT)
    public void updateOpinion(@RequestBody ObjectNode objectNode, @PathVariable Long postId,
            @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser
                && currentUser.getUserRole().equals(UserRole.MODERATOR)) {
            String newContent = objectNode.get("newContent").asText();
            Long newTargetProfessorId = objectNode.get("newTargetProfessorId").asLong();
            mainService.updateOpinion(newContent, newTargetProfessorId, postId);
        }
    }

    @RequestMapping(value = "/updateThread/{postId}", method = RequestMethod.PUT)
    public void updateThread(@RequestBody ObjectNode objectNode, @PathVariable Long postId,
            @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser
                && currentUser.getUserRole().equals(UserRole.MODERATOR)) {
            String newTitle = objectNode.get("newTitle").asText();
            String newContent = objectNode.get("newContent").asText();
            Long newTargetSubjectId = objectNode.get("newTargetSubjectId").asLong();

            if (objectNode.has("newParentThreadId")) {
                Long newParentThreadId = objectNode.get("newParentThreadId").asLong();
                mainService.update_Thread(newTitle, newContent, newTargetSubjectId, newParentThreadId, postId);
            } else {
                mainService.update_Thread(newTitle, newContent, newTargetSubjectId, null, postId);
            }
        }
    }

    @RequestMapping(value = "/lockUser/{userId}", method = RequestMethod.GET)
    public void lockUser(@PathVariable Long userId, @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser
                && currentUser.getUserRole().equals(UserRole.MODERATOR)) {
            mainService.lockUser(userId);
        }
    }

    @RequestMapping(value = "/deleteUser/{userId}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable Long userId, @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser
                && currentUser.getUserRole().equals(UserRole.MODERATOR)) {
            mainService.deleteUser(userId);
        }
    }

    @RequestMapping(value = "/updateUserFullName/{userId}", method = RequestMethod.PUT)
    public void updateUserFullName(@RequestBody ObjectNode objectNode, @PathVariable Long userId,
            @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser
                && (currentUser.getUserRole().equals(UserRole.MODERATOR) || currentUser.getId().equals(userId))) {
            String newFullName = objectNode.get("newFullName").asText();
            mainService.updateUserFullName(newFullName, userId);
        }
    }

    @RequestMapping(value = "/updateUserUsername/{userId}", method = RequestMethod.PUT)
    public void updateUserUsername(@RequestBody ObjectNode objectNode, @PathVariable Long userId,
            @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser
                && (currentUser.getUserRole().equals(UserRole.MODERATOR) || currentUser.getId().equals(userId))) {
            String newUsername = objectNode.get("newUsername").asText();
            mainService.updateUserUsername(newUsername, userId);
        }
    }

    @RequestMapping(value = "/reportOpinion/{postId}", method = RequestMethod.POST)
    public void reportOpinion(@RequestBody ObjectNode objectNode, @PathVariable Long postId,
                              @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser) {
            String description = objectNode.get("description").asText();
            mainService.reportOpinion(postId, currentUser, description);
        }
    }

    @RequestMapping(value = "/reportThread/{postId}", method = RequestMethod.POST)
    public void reportThread(@RequestBody ObjectNode objectNode, @PathVariable Long postId,
                              @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser) {
            String description = objectNode.get("description").asText();
            mainService.reportThread(postId, currentUser, description);
        }
    }

    @RequestMapping(value = "/markReportResolved/{postReportId}/", method = RequestMethod.GET)
    public void markReportResolved(@PathVariable Long postReportId, @PathVariable String action, @CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser) {
            mainService.markReport(postReportId, action);
        }
    }

    @RequestMapping(value = "/getAllPostReports", method = RequestMethod.GET)
    public List<PostReport> getAllPostReports(@CurrentSecurityContext SecurityContext context) throws AuthenticationException{
        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails currentUser
                && currentUser.getUserRole().equals(UserRole.MODERATOR)) {
            return mainService.getAllPostReports();
        } else throw new AuthenticationException("Invalid role");
     }


}
