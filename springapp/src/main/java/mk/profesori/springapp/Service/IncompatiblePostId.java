package mk.profesori.springapp.Service;

public class IncompatiblePostId extends RuntimeException{
    public IncompatiblePostId(String message) {
        super(message);
    }
}
