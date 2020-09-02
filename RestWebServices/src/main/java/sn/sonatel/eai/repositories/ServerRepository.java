package sn.sonatel.eai.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.sonatel.eai.models.Action;
import sn.sonatel.eai.models.Server;

@Repository
public interface ServerRepository extends JpaRepository<Server, Long>{
	
	List<Server> findByServerNameContaining(String serverName);

}
