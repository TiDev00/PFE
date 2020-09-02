package sn.sonatel.eai.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.sonatel.eai.models.Action;

@Repository
public interface ActionRepository extends JpaRepository<Action, Long>{
	
	List<Action> findByActionNameContaining(String actionName);

}
