package sn.sonatel.eai.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.sonatel.eai.models.Action;
import sn.sonatel.eai.models.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
	
	List<Application> findByAppNameContaining(String appName);
}
