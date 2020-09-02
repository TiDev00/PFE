package sn.sonatel.eai.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.sonatel.eai.models.Action;
import sn.sonatel.eai.models.Command;

@Repository
public interface CommandRepository extends JpaRepository<Command, Long>{
	
	List<Command> findByCommandNameContaining(String commandName);

}
