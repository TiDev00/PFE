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

import sn.sonatel.eai.models.Action;
import sn.sonatel.eai.service.ActionService;

@RestController
@RequestMapping("/actions")
public class ActionController {
	
	@Autowired
	private ActionService actionService;
	
	
	@PostMapping("/add")
	@ResponseStatus(HttpStatus.CREATED)
	public Action createAction(@RequestBody Action action){
		return actionService.createAction(action);
			
	}
	
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Action> readActions() {
		return actionService.readActions();		
	}
	
	
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Action readAction(@PathVariable Long id) {
		return actionService.readAction(id);		
	}
		
	
	@PutMapping("/update")
	@ResponseStatus(HttpStatus.OK)
	public Action updateAction(@RequestBody Action action){
		return actionService.updateAction(action);		
	}	
	

	@DeleteMapping("/delete/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Action deleteAction(@PathVariable Long id) {
		return actionService.deleteAction(id);	
	}

}
