package sn.sonatel.eai.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.sonatel.eai.models.Command;

public interface CommandRepository extends JpaRepository<Command, Long>{

}
