package mk.profesori.springapp.Service.Exception;

public class IncompatiblePostId extends RuntimeException{
    public IncompatiblePostId(String message) {
        super(message);
    }
}
