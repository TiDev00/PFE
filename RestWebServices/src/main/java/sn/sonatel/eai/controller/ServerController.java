package sn.sonatel.eai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import sn.sonatel.eai.models.Server;
import sn.sonatel.eai.service.ServerService;

@RestController
@RequestMapping("/servers")
public class ServerController {
	
	@Autowired
	private ServerService serverService;
	
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Server createServer(@RequestBody Server server){
		return serverService.createServer(server);
			
	}
	
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Server> readServers(@RequestParam(required = false) String serverName) {
		return serverService.readServers(serverName);		
	}
	
	
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Server readServer(@PathVariable Long id) {
		return serverService.readServer(id);		
	}
		
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Server updateServer(@RequestBody Server server){
		return serverService.updateServer(server);		
	}	
	

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Server deleteServer(@PathVariable Long id) {
		return serverService.deleteServer(id);	
	}

}
