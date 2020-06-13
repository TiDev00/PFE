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

import sn.sonatel.eai.models.Log;
import sn.sonatel.eai.service.LogService;

@RestController 
@RequestMapping("/logs") 
public class LogController {
	
	@Autowired
	private LogService logService;
	

	@PostMapping("/add")
	@ResponseStatus(HttpStatus.CREATED)
	public Log createLog(@RequestBody Log log){
		return logService.createLog(log);	
	}
	
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Log> readLogs() {
		return logService.readLogs();	
	}
	
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Log readLog(@PathVariable Long id) {
		return logService.readLog(id);		
	}
		

	@PutMapping("/update")
	@ResponseStatus(HttpStatus.OK)
	public Log updateLog(@RequestBody Log log){
		return logService.updateLog(log);		
	}	
	
	
	@DeleteMapping("/delete/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Log deleteLog(@PathVariable Long id) {
		return logService.deleteLog(id);
	}
	
}
