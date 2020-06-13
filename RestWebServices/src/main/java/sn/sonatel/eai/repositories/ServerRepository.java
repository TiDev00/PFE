package sn.sonatel.eai.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.sonatel.eai.models.Server;

@Repository
public interface ServerRepository extends JpaRepository<Server, Long>{

}
