package sn.sonatel.eai.exceptions;

public class GroupNotFoundException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	
	 public GroupNotFoundException(String message) {
	        super(message);
	    }

	 public GroupNotFoundException(String entity, Object value) {
	        super(entity + " with id " + value + " Not Found");
	    }


}
