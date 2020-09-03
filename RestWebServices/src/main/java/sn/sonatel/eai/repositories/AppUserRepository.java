package sn.sonatel.eai.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import sn.sonatel.eai.models.AppUser;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, String> {
	
	boolean existsById(String matricule);
	
	AppUser findByMatricule(String matricule);
	
	List<AppUser> findByMatriculeContaining(String matricule);

}
