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

import sn.sonatel.eai.models.Process;
import sn.sonatel.eai.service.ProcessService;

@RestController
@RequestMapping("/processes")
public class ProcessController {
	
	@Autowired
	private ProcessService processService;
	
	
	@PostMapping("/add")
	@ResponseStatus(HttpStatus.CREATED)
	public Process createProcess(@RequestBody Process process){
		return processService.createProcess(process);
			
	}
	
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Process> readProcesses() {
		return processService.readProcesses();		
	}
	
	
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Process readProcess(@PathVariable Long id) {
		return processService.readProcess(id);		
	}
		
	
	@PutMapping("/update")
	@ResponseStatus(HttpStatus.OK)
	public Process updateProcess(@RequestBody Process process){
		return processService.updateProcess(process);		
	}	
	

	@DeleteMapping("/delete/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Process deleteProcess(@PathVariable Long id) {
		return processService.deleteProcess(id);	
	}

}
