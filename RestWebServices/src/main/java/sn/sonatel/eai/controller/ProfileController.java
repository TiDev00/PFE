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

import sn.sonatel.eai.models.Profile;
import sn.sonatel.eai.service.ProfileService;

@RestController
@RequestMapping("/profiles")
public class ProfileController {
	
	@Autowired
	private ProfileService profileService;
	
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Profile createProfile(@RequestBody Profile profile){
		return profileService.createProfile(profile);
			
	}
	
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Profile> readProfiles() {
		return profileService.readProfiles();		
	}
	
	
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Profile readProfile(@PathVariable Long id) {
		return profileService.readProfile(id);		
	}
		
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Profile updateProfile(@RequestBody Profile profile){
		return profileService.updateProfile(profile);		
	}	
	

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Profile deleteProfile(@PathVariable Long id) {
		return profileService.deleteProfile(id);	
	}

}
