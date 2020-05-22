package sn.sonatel.eai.exceptions;

public class AppUserNotFoundException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	
	 public AppUserNotFoundException(String message) {
	        super(message);
	    }

	 public AppUserNotFoundException(String entity, Object value) {
	        super(entity + " with matricule " + value + " Not Found");
	    }


}
