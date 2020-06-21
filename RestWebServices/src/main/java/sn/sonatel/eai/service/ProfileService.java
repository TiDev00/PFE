package sn.sonatel.eai.service;

import java.util.List;

import sn.sonatel.eai.models.Profile;

public interface ProfileService {
	
	Profile createProfile(Profile profile);
	Profile updateProfile(Profile profile);
	Profile readProfile(Long id);
	List<Profile> readProfiles();
	Profile deleteProfile(Long id);

}
