package sn.sonatel.eai.exceptions;

public class LogNotFoundException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	
	 public LogNotFoundException(String message) {
	        super(message);
	    }

	 public LogNotFoundException(String entity, Object value) {
	        super(entity + " with id " + value + " Not Found");
	    }


}
