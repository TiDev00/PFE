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

import sn.sonatel.eai.models.AppUser;
import sn.sonatel.eai.service.AppUserService;

@RestController 
@RequestMapping("/users") 
//permet de mapper toutes les requetes contenues dans AppUserController a /users
public class AppUserController {
	
	@Autowired
	private AppUserService appuserService;
	
	//Creation d'un appuser
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public AppUser createAppUser(@RequestBody AppUser appuser){
		return appuserService.createAppUser(appuser);		
	}
	
	//afficher l'ensemble des appusers
		
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<AppUser> readAppUsers() {
		return appuserService.readAppUsers();		
	}
	
	//trouver un appuser precis
	
	@GetMapping("/{matricule}")
	@ResponseStatus(HttpStatus.OK)
	public AppUser readAppUser(@PathVariable String matricule) {
		return appuserService.readAppUser(matricule);		
	}
	
	//Update d'un appuser existant dans la base
	
	@PutMapping("/{matricule}")
	@ResponseStatus(HttpStatus.OK)
	public AppUser updateAppUser(@RequestBody AppUser appuser){
		return appuserService.updateAppUser(appuser);		
	}	
	
	//Suppression d'un appuser dans la base
	
	@DeleteMapping("/{matricule}")
	@ResponseStatus(HttpStatus.OK)
	public AppUser deleteAppUser(@PathVariable String matricule) {
		return appuserService.deleteAppUser(matricule);
		
	}
	
}
