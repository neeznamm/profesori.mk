package mk.profesori.springapp.Service;

import java.time.LocalDateTime;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import mk.profesori.springapp.Model.ConfirmationToken;
import mk.profesori.springapp.Model.CustomUserDetails;
import mk.profesori.springapp.Model.RegistrationRequest;
import mk.profesori.springapp.Model.UserRole;
import mk.profesori.springapp.Repository.UserRepository;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final CustomUserDetailsService customUserDetailsService;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailValidator emailValidator;
    private final PasswordValidator passwordValidator;
    private final UsernameValidator usernameValidator;
    private final EmailSender emailSender;
    private final UserRepository userRepository;

    public String register(RegistrationRequest request) {

        boolean isValidEmail = emailValidator.test(request.getEmail());
        if (!isValidEmail)
            throw new IllegalStateException("Invalid email");

        boolean isValidPassword = passwordValidator.test(request.getPassword());
        if (!isValidPassword)
            throw new IllegalStateException("Invalid password");

        boolean isValidUsername = usernameValidator.test(request.getUsername());
        if (!isValidUsername)
            throw new IllegalStateException("Invalid username");

        boolean emailExists = userRepository.findByEmail(request.getEmail()).isPresent();
        if (emailExists) {
            if (!userRepository.findByEmail(request.getEmail()).get().isEnabled()) {
                String tokenToResend = customUserDetailsService
                        .createToken(userRepository.findByEmail(request.getEmail()).get());
                String link = "http://192.168.0.17:8080/registration/confirm?token=" + tokenToResend;
                emailSender.send(request.getEmail(), emailSender.buildEmail(request.getUsername(), link));
                return tokenToResend;
            } else {
                throw new IllegalStateException("Email is taken");
            }
        }

        boolean usernameExists = userRepository.findByUsername(request.getUsername()).isPresent();
        if (usernameExists) {
            throw new IllegalStateException("Username is taken");
        }

        String token = customUserDetailsService.signUp(
                new CustomUserDetails(
                        request.getFullName(),
                        request.getUsername(),
                        request.getEmail(),
                        request.getPassword(),
                        UserRole.REGULAR));

        String link = "http://192.168.0.17:8080/registration/confirm?token=" + token;

        emailSender.send(request.getEmail(), emailSender.buildEmail(request.getUsername(), link));

        return token;
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() -> new IllegalStateException("Token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("Email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        customUserDetailsService.enableUser(
                confirmationToken.getCustomUserDetails().getEmail());
        return "Confirmed";
    }
}
