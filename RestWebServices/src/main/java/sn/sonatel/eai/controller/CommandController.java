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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import sn.sonatel.eai.models.Command;
import sn.sonatel.eai.service.CommandService;

@RestController
@RequestMapping("/commands")
public class CommandController {
	
	@Autowired
	private CommandService commandService;
	
	
	@PostMapping("/add")
	@ResponseStatus(HttpStatus.CREATED)
	public Command createCommand(@RequestBody Command command){
		return commandService.createCommand(command);
			
	}
	
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Command> readCommands() {
		return commandService.readCommands();		
	}
	
	
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Command readCommand(@PathVariable Long id) {
		return commandService.readCommand(id);		
	}
		
	
	@PutMapping("/update")
	@ResponseStatus(HttpStatus.OK)
	public Command updateCommand(@RequestBody Command command){
		return commandService.updateCommand(command);		
	}	
	

	@DeleteMapping("/delete/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Command deleteCommand(@PathVariable Long id) {
		return commandService.deleteCommand(id);	
	}

}