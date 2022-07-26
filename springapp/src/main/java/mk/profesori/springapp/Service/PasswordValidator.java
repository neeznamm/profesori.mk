package mk.profesori.springapp.Service;

import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class PasswordValidator implements Predicate<String> {
    
    @Override
    public boolean test(String password) {
        
        String regex = "^(?=.*[0-9])"
                       + "(?=.*[a-z])(?=.*[A-Z])"
                       + "(?=.*[@#$%^&+=])"
                       + "(?=\\S+$).{8,20}$";

        Pattern pattern = Pattern.compile(regex);

        if (password == null) {
            return false;
        }

        Matcher matcher = pattern.matcher(password);

        return matcher.matches();   
    }
}

/*
    It contains at least 8 characters and at most 20 characters.
    It contains at least one digit.
    It contains at least one upper case alphabet.
    It contains at least one lower case alphabet.
    It contains at least one special character which includes !@#$%&*()-+=^.
    It doesn’t contain any white space.
 */
