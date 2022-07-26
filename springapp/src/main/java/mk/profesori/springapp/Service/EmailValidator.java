package mk.profesori.springapp.Service;

import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class EmailValidator implements Predicate<String> {
    
    @Override
    public boolean test(String email) {
        
        String regex = "^(.+)@(.+)$";

        Pattern pattern = Pattern.compile(regex);

        if (email == null) {
            return false;
        }

        Matcher matcher = pattern.matcher(email);

        return matcher.matches();   
    }
}
