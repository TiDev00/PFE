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
		String forstatus = requete.getForStatus();


		String ansibleCmd = "ansible " + serverName + " -m shell -a '" + commandName + "'";
		

		//String ansibleCmd = "ansible " + serverName + " -m shell -a '" + commandName + "'";
		
		String cmdTest = commandName +" "+ serverName; 


        ProcessBuilder processBuilder = new ProcessBuilder();

        if (isWindows) {
            processBuilder.command("cmd", "/c", ansibleCmd);
        } 
        else {
            processBuilder.command("sh", "-c", ansibleCmd);
        }

        try {

            Process process = processBuilder.start();

            BufferedReader reader =
                    new BufferedReader(new InputStreamReader(process.getInputStream()));

            
            Reponse response = new Reponse();       
            
            int exitCode = process.waitFor();
            
         
            if (exitCode == 0) {
            	
            	response.setTraitement("OK");
            	
            	if (forstatus.contentEquals("YES") && reader.ready()) {
                	response.setOutput("1");
                    process.destroy();
                	return response;                   		
            	}
            	
            	if (forstatus.contentEquals("YES") && !reader.ready()) {
            		response.setOutput("2");
                    process.destroy();
            		return response;	
            	}
            	
            	LOGGER.log(Level.INFO, "Task was executed successfully!");
            	return response;
            }
            
            else {
            	response.setTraitement("KO");
                LOGGER.log(Level.WARNING, "Error during task execution!");
                process.destroy();
                return response;
            }
            
        }
        catch (IOException|InterruptedException e) {
        	Reponse error = new Reponse();     
        	error.setTraitement("Task initialization issue");
        	LOGGER.log(Level.SEVERE, "Impossible to create the task");
        	return error;
        }
        
	}
	
}
