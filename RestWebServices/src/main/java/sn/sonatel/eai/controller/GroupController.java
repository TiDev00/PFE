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

import sn.sonatel.eai.models.Group;
import sn.sonatel.eai.service.GroupService;

@RestController
@RequestMapping("/services")
public class GroupController {
	
	@Autowired
	private GroupService groupService;
	
	@PostMapping("/add")
	@ResponseStatus(HttpStatus.CREATED)
	public Group createGroup(@RequestBody Group group){
		return groupService.createGroup(group);
			
	}
	
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Group> readGroups() {
		return groupService.readGroups();		
	}
	
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Group readGroup(@PathVariable Long id) {
		return groupService.readGroup(id);		
	}
		
		

	@PutMapping("/update")
	@ResponseStatus(HttpStatus.OK)
	public Group updateGroup(@RequestBody Group group){
		return groupService.updateGroup(group);		
	}	
	
	
	@DeleteMapping("/delete/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Group deleteGroup(@PathVariable Long id) {
		return groupService.deleteGroup(id);
		
	}

}
