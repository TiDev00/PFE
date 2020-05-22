package sn.sonatel.eai.service;

import java.util.List;

import sn.sonatel.eai.models.AppUser;

public interface AppUserService {
	
	AppUser createAppUser(AppUser appuser);
	AppUser updateAppUser(AppUser appuser);
	AppUser readAppUser(String matricule);
	List<AppUser> readAppUsers();
	AppUser deleteAppUser(String matricule);
	
	AppUser findByMatricule(String matricule);
	

}
