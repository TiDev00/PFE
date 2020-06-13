package sn.sonatel.eai.exceptions;

public class CommandNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	 public CommandNotFoundException(String message) {
	        super(message);
	    }

	 public CommandNotFoundException(String entity, Object value) {
	        super(entity + " with id " + value + " Not Found");
	    }
}
