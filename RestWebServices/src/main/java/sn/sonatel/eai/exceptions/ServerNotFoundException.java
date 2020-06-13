package sn.sonatel.eai.exceptions;

public class ServerNotFoundException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	
	 public ServerNotFoundException(String message) {
	        super(message);
	    }

	 public ServerNotFoundException(String entity, Object value) {
	        super(entity + " with id " + value + " Not Found");
	    }

}
