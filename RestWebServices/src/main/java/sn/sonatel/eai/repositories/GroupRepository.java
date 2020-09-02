package sn.sonatel.eai.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.sonatel.eai.models.Action;
import sn.sonatel.eai.models.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
	
	List<Group> findByServiceNameContaining(String serviceName);
	
}
