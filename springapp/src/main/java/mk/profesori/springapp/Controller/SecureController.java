package mk.profesori.springapp.Controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import mk.profesori.springapp.Model.CustomUserDetails;
import mk.profesori.springapp.Service.CustomUserDetailsService;
import mk.profesori.springapp.Service.MainService;

@RestController
@RequestMapping("/secure")
@CrossOrigin(origins = { "http://192.168.0.17:3000", "http://192.168.0.28:3000" })
public class SecureController {

    @Autowired
    private MainService mainService;
    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @RequestMapping(value = "/professor/{professorId}/addOpinion", method = RequestMethod.POST)
    public void addOpinion(@RequestBody ObjectNode objectNode, @PathVariable Long professorId,
            @CurrentSecurityContext SecurityContext context) {

        Authentication authentication = context.getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails currentUser = (CustomUserDetails) authentication.getPrincipal();
            String title = objectNode.get("title").asText();
            String content = objectNode.get("content").asText();
            mainService.addOpinion(title, content, professorId, currentUser);
        }
    }

    @RequestMapping(value = "/professor/{professorId}/replyToOpinion/{postId}", method = RequestMethod.POST)
    public void replyToOpinion(@RequestBody ObjectNode objectNode, @PathVariable Long professorId,
            @PathVariable Long postId, @CurrentSecurityContext SecurityContext context) {

        Authentication authentication = context.getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails currentUser = (CustomUserDetails) authentication.getPrincipal();
            String content = objectNode.get("content").asText();
            mainService.replyToOpinion(content, professorId, postId, currentUser);
        }
    }

    @RequestMapping(value = "/currentUser", method = RequestMethod.GET)
    public UserDetails getUserDetails(@CurrentSecurityContext SecurityContext context) {

        Authentication authentication = context.getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails currentUser = (CustomUserDetails) authentication.getPrincipal();
            return customUserDetailsService.loadUserByUsername(currentUser.getEmail());
        }

        return null;
    }

    @RequestMapping(value = "/professor/{professorId}/upvoteOpinion/{postId}", method = RequestMethod.GET)
    public void upvoteOpinion(@PathVariable Long professorId,
            @PathVariable Long postId, @CurrentSecurityContext SecurityContext context) {

        Authentication authentication = context.getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails currentUser = (CustomUserDetails) authentication.getPrincipal();
            mainService.upvoteOpinion(postId, currentUser);
        }
    }

    @RequestMapping(value = "/professor/{professorId}/downvoteOpinion/{postId}", method = RequestMethod.GET)
    public void downvoteOpinion(@PathVariable Long professorId,
            @PathVariable Long postId, @CurrentSecurityContext SecurityContext context) {

        Authentication authentication = context.getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails currentUser = (CustomUserDetails) authentication.getPrincipal();
            mainService.downvoteOpinion(postId, currentUser);
        }
    }

}
