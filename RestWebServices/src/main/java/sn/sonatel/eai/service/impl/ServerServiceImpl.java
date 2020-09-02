package sn.sonatel.eai.service.impl;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.sonatel.eai.exceptions.ServerNotFoundException;
import sn.sonatel.eai.models.Action;
import sn.sonatel.eai.models.Server;
import sn.sonatel.eai.repositories.ServerRepository;
import sn.sonatel.eai.service.ServerService;

@Service
@Transactional
public class ServerServiceImpl implements ServerService {

	@Autowired
	private ServerRepository serverRepository; 
	
	private static final Logger LOGGER = Logger.getLogger(ServerServiceImpl.class.getName());
	
	
	@Override
	public Server createServer(Server server) {
		
		String filePath = "C:/Users/stg_cisse50339/Desktop/myfile.txt";
		
		String serverName = server.getServerName();
		
		String ipServer = server.getIpServer();
		
		String login = server.getLogin();
		
		String password = server.getPassword();
		
		try (PrintWriter writer = new PrintWriter(new BufferedWriter((new FileWriter(filePath, true))))){
			writer.println();
			writer.println("[" + serverName + "]");
			writer.println(ipServer + " ansible_user=" + login + " ansible_password=" + password);
		}
		catch(IOException e) {
			LOGGER.log(Level.WARNING, "Impossible to write in the inventory file");
			throw new RuntimeException(e);
		}
		
		return serverRepository.save(server);
	}

	
	@Override
	public List<Server> readServers(String serverName) {
		if (serverName == null) {
			return serverRepository.findAll(Sort.by(Sort.Direction.ASC, "serverName"));			
		}
		List<Server> servers = new ArrayList<>();
		serverRepository.findByServerNameContaining(serverName).forEach(servers::add);
		return servers;
	}
	

	@Override
	public Server readServer(Long id) {
		Optional<Server> server = serverRepository.findById(id);
		
		if (!server.isPresent()) {
			throw new ServerNotFoundException("Server", id);
		    } 
		else {
			  return server.get();
		    }
	}
	
	
	@Override
	public Server updateServer(Server server) {
		Optional<Server> serverData = serverRepository.findById(server.getId());
		
		if (!serverData.isPresent()) {
			throw new ServerNotFoundException("Server", server.getId());
		    } 
		else {
			
		      return serverRepository.save(server);
		    }
	}
	

	@Override
	public Server deleteServer(Long id) {
		Optional<Server> serverData = serverRepository.findById(id);
		if (!serverData.isPresent()) {
			throw new ServerNotFoundException("Server", id);
		    } 
		else {
			 serverRepository.deleteById(id);	
			 return serverData.get();
		    }     
	}

	
}
