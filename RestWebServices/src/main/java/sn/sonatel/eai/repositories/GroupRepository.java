package sn.sonatel.eai.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.sonatel.eai.models.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
	
}
