package sn.sonatel.eai.exceptions;

public class AppUserAlreadyExistException extends RuntimeException{

	
	private static final long serialVersionUID = 1L;
	
	 public AppUserAlreadyExistException(String message) {
	        super(message);
	    }

	 public AppUserAlreadyExistException(String entity, Object value) {
	        super(entity + " with matricule " + value + " already exist");
	    }

}
