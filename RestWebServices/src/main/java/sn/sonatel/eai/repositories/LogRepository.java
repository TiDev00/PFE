package sn.sonatel.eai.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.sonatel.eai.models.Log;

@Repository
public interface LogRepository extends JpaRepository<Log, Long> {
	
}
