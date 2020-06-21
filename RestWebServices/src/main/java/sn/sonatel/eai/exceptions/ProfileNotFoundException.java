package sn.sonatel.eai.exceptions;

public class ProfileNotFoundException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	
	 public ProfileNotFoundException(String message) {
	        super(message);
	    }

	 public ProfileNotFoundException(String entity, Object value) {
	        super(entity + " with id " + value + " Not Found");
	    }

}
