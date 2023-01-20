package mk.profesori.springapp.Service.Exception;

public class DisallowedOperationException extends RuntimeException{
    public DisallowedOperationException(String message) {
        super(message);
    }
}
