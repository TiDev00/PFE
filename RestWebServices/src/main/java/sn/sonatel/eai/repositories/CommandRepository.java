package sn.sonatel.eai.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.sonatel.eai.models.Command;

@Repository
public interface CommandRepository extends JpaRepository<Command, Long>{

}
