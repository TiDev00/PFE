package sn.sonatel.eai.service.impl;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.sonatel.eai.models.Requete;
import sn.sonatel.eai.models.Reponse;
import sn.sonatel.eai.service.ExecuteCommandService;

@Service
@Transactional
public class ExecuteCommandServiceImpl implements ExecuteCommandService{
	
	private static final Logger LOGGER = Logger.getLogger(ExecuteCommandServiceImpl.class.getName());
	

	@Override
	public Reponse commandExecutor(Requete requete) {
		
		boolean isWindows = System.getProperty("os.name")
                .toLowerCase().startsWith("windows");
		
		String serverName = requete.getServerName();
		String commandName = requete.getCommandName();

		//String ansibleCmd = "ansible " + serverName + " -m shell -a '" + commandName + "'";

		
        String cmdTest = serverName + commandName ;

        ProcessBuilder processBuilder = new ProcessBuilder();

        if (isWindows) {
            processBuilder.command("cmd", "/c", cmdTest);
        } 
        else {
            processBuilder.command("sh", "-c", cmdTest);
        }

        try {

            Process process = processBuilder.start();

            BufferedReader reader =
                    new BufferedReader(new InputStreamReader(process.getInputStream()));

            
            Reponse status = new Reponse();       
            
            int exitCode = process.waitFor();
            
         
            if (exitCode == 0) {
            	
            	status.setMessage("OK");
            	LOGGER.log(Level.INFO, "Task was executed successfully!");
            	
            	
            	if(reader.ready()) {
            		status.setOutput("Application is running");
                    process.destroy();
            		return status;   
            	}
            	
            	status.setOutput("Application is stopped");
                process.destroy();
        		return status;		
            }
            else {
            	status.setMessage("KO");
                LOGGER.log(Level.WARNING, "Error during task execution!");
                process.destroy();
                return status;
            }
            
        }
        catch (IOException|InterruptedException e) {
        	Reponse error = new Reponse();     
        	error.setMessage("Task initialization issue");
        	LOGGER.log(Level.SEVERE, "Impossible to create the task");
        	return error;
        }
        
	}
	
}
