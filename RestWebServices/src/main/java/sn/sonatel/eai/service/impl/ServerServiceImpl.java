package sn.sonatel.eai.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.sonatel.eai.exceptions.ServerNotFoundException;
import sn.sonatel.eai.models.Server;
import sn.sonatel.eai.repositories.ServerRepository;
import sn.sonatel.eai.service.ServerService;

@Service
@Transactional
public class ServerServiceImpl implements ServerService {

	@Autowired
	private ServerRepository serverRepository; 
	
	
	
	@Override
	public Server createServer(Server server) {
		return serverRepository.save(server);
	}

	
	@Override
	public List<Server> readServers() {
		return serverRepository.findAll(Sort.by(Sort.Direction.ASC, "serverName"));
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
