package mk.profesori.springapp.Service;

public interface EmailSender {
    void send(String to, String email);
    String buildEmail(String username, String link);
}
