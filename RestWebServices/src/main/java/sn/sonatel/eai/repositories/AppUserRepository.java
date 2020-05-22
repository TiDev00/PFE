package sn.sonatel.eai.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.sonatel.eai.models.AppUser;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, String> {
	
	boolean existsById(String matricule);
	
	public AppUser findByMatricule(String matricule);
	

}
