package mk.profesori.springapp.Model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {
    private final String fullName; //formata treba da dozvoli ova da prazno
    private final String username;
    private final String email;
    private final String password;
}
