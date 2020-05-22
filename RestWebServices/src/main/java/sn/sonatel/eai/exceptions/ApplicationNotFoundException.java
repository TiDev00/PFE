package sn.sonatel.eai.exceptions;

public class ApplicationNotFoundException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	
	 public ApplicationNotFoundException(String message) {
	        super(message);
	    }

	 public ApplicationNotFoundException(String entity, Object value) {
	        super(entity + " with id " + value + " Not Found");
	    }


}
