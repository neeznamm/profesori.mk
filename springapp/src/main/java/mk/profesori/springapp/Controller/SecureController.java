package mk.profesori.springapp.Controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import mk.profesori.springapp.Model.CustomUserDetails;
import mk.profesori.springapp.Service.CustomUserDetailsService;
import mk.profesori.springapp.Service.MainService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/secure")
@CrossOrigin(origins = { "http://192.168.0.17:3000", "http://192.168.0.39:3000" })
public class SecureController {

    private final MainService mainService;
    final
    CustomUserDetailsService customUserDetailsService;

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

}
