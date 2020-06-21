package sn.sonatel.eai.service.impl;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import sn.sonatel.eai.models.AppUser;
import sn.sonatel.eai.service.AppUserService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private AppUserService appuserService;
	
	
	@Override
	public UserDetails loadUserByUsername(String matricule) throws UsernameNotFoundException {
		
		AppUser user = appuserService.findByMatricule(matricule);
		
		if(user == null) throw new UsernameNotFoundException(matricule);
		
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		
		user.getProfiles().forEach(s -> authorities.add(new SimpleGrantedAuthority(s.getProfileName())));
		
		return new User(user.getMatricule(), user.getPassword(), authorities);
		
	}	
	
}
