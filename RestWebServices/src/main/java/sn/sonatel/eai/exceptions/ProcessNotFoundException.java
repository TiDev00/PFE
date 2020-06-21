package sn.sonatel.eai.exceptions;

public class ProcessNotFoundException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	
	 public ProcessNotFoundException(String message) {
	        super(message);
	    }

	 public ProcessNotFoundException(String entity, Object value) {
	        super(entity + " with id " + value + " Not Found");
	    }

}
