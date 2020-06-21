package sn.sonatel.eai.exceptions;

public class ActionNotFoundException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	
	 public ActionNotFoundException(String message) {
	        super(message);
	    }

	 public ActionNotFoundException(String entity, Object value) {
	        super(entity + " with id " + value + " Not Found");
	    }

}
