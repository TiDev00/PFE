package sn.sonatel.eai.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.sonatel.eai.exceptions.AppUserAlreadyExistException;
import sn.sonatel.eai.exceptions.AppUserNotFoundException;
import sn.sonatel.eai.models.AppUser;
import sn.sonatel.eai.repositories.AppUserRepository;
import sn.sonatel.eai.service.AppUserService;

@Service
@Transactional
public class AppUserServiceImpl implements AppUserService{

	
	/*
	 * @Resource means get me a known resource by name. The name is extracted from the name of the annotated setter or field
	 *  or it is taken from the name-Parameter.
	 * @Inject or @Autowired try to wire in a suitable other component by type.
	 */
	@Autowired
	private AppUserRepository appuserRepository; 
	
	@Override
	public AppUser findByMatricule(String matricule) {
		return appuserRepository.findByMatricule(matricule);
	}
	
	
	@Override
	public AppUser createAppUser(AppUser appuser) {
		
		if (appuserRepository.existsById(appuser.getMatricule())) {
			
			throw new AppUserAlreadyExistException("User", appuser.getMatricule());
		} 
		return appuserRepository.save(appuser);
	}

	
	@Override
	public List<AppUser> readAppUsers() {
		return appuserRepository.findAll(Sort.by(Sort.Direction.ASC, "lastName"));
	}
	

	@Override
	public AppUser readAppUser(String matricule) {
		Optional<AppUser> appuser = appuserRepository.findById(matricule);
		
		if (!appuser.isPresent()) {
			throw new AppUserNotFoundException("User", matricule);
		    } 
		else {
			  return appuser.get();
		    }
	}
	
	
	@Override
	public AppUser updateAppUser(AppUser appuser) {
		Optional<AppUser> appuserData = appuserRepository.findById(appuser.getMatricule());
		
		if (!appuserData.isPresent()) {
			throw new AppUserNotFoundException("User", appuser.getMatricule());
		    } 
		else {
			
		      return appuserRepository.save(appuser);
		    }
	}
	

	@Override
	public AppUser deleteAppUser(String matricule) {
		Optional<AppUser> appuserData = appuserRepository.findById(matricule);
		if (!appuserData.isPresent()) {
			throw new AppUserNotFoundException("User", matricule);
		    } 
		else {
			 appuserRepository.deleteById(matricule);	
			 return appuserData.get();
		    }     
	}
	

}
