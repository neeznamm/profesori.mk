package mk.profesori.springapp.Service;

public class DisallowedOperationException extends RuntimeException{
    public DisallowedOperationException(String message) {
        super(message);
    }
}
