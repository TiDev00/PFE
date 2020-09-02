package sn.sonatel.eai.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.sonatel.eai.models.Action;
import sn.sonatel.eai.models.Process;

@Repository
public interface ProcessRepository extends JpaRepository<Process, Long>{
	
	List<Process> findByProcessNameContaining(String processName);

}
