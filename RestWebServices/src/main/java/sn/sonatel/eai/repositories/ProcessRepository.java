package sn.sonatel.eai.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.sonatel.eai.models.Process;

@Repository
public interface ProcessRepository extends JpaRepository<Process, Long>{

}