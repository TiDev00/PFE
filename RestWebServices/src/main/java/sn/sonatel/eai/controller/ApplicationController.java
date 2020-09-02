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

import sn.sonatel.eai.models.Application;
import sn.sonatel.eai.service.ApplicationService;

@RestController
@RequestMapping("/applications")
public class ApplicationController {
	
	@Autowired
	private ApplicationService applicationService;
	
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Application createApplication(@RequestBody Application application){
		return applicationService.createApplication(application);
			
	}
	
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Application> readApplications(@RequestParam(required = false) String appName) {
		return applicationService.readApplications(appName);		
	}
	
	
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Application readApplication(@PathVariable Long id) {
		return applicationService.readApplication(id);		
	}
		
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Application updateApplication(@RequestBody Application application){
		return applicationService.updateApplication(application);		
	}	
	

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Application deleteApplication(@PathVariable Long id) {
		return applicationService.deleteApplication(id);	
	}

}
