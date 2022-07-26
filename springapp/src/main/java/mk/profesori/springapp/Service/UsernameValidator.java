package mk.profesori.springapp.Service;

import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class UsernameValidator implements Predicate<String> {
    
    @Override
    public boolean test(String username) {
        
        String regex = "^[A-Za-z]\\w{5,29}$";
        
        Pattern pattern = Pattern.compile(regex);

        if (username == null) {
            return false;
        }

        Matcher matcher = pattern.matcher(username);

        return matcher.matches();   
    }
}

/*
  - The username consists of 6 to 30 characters inclusive. If the username
    consists of less than 6 or greater than 30 characters, then it is an invalid username.
  - The username can only contain alphanumeric characters and underscores (_). 
    Alphanumeric characters describe the character set consisting of lowercase characters [a – z], uppercase characters [A – Z], and digits [0 – 9].
  - The first character of the username must be an alphabetic character, i.e., either lowercase character
    [a – z] or uppercase character [A – Z].
 */
