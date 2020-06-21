package sn.sonatel.eai.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.sonatel.eai.exceptions.ProfileNotFoundException;
import sn.sonatel.eai.models.Profile;
import sn.sonatel.eai.repositories.ProfileRepository;
import sn.sonatel.eai.service.ProfileService;

@Service
@Transactional
public class ProfileServiceImpl implements ProfileService{
	
	@Autowired
	private ProfileRepository profileRepository; 
	
	
	
	@Override
	public Profile createProfile(Profile profile) {
		return profileRepository.save(profile);
	}

	
	@Override
	public List<Profile> readProfiles() {
		return profileRepository.findAll(Sort.by(Sort.Direction.ASC, "profileName"));
	}
	

	@Override
	public Profile readProfile(Long id) {
		Optional<Profile> profile = profileRepository.findById(id);
		
		if (!profile.isPresent()) {
			throw new ProfileNotFoundException("Profile", id);
		    } 
		else {
			  return profile.get();
		    }
	}
	
	
	@Override
	public Profile updateProfile(Profile profile) {
		Optional<Profile> profileData = profileRepository.findById(profile.getId());
		
		if (!profileData.isPresent()) {
			throw new ProfileNotFoundException("Profile", profile.getId());
		    } 
		else {
			
		      return profileRepository.save(profile);
		    }
	}
	

	@Override
	public Profile deleteProfile(Long id) {
		Optional<Profile> profileData = profileRepository.findById(id);
		if (!profileData.isPresent()) {
			throw new ProfileNotFoundException("Profile", id);
		    } 
		else {
			 profileRepository.deleteById(id);	
			 return profileData.get();
		    }     
	}


}
