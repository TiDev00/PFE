package sn.sonatel.dsi.eai.repository;

import sn.sonatel.dsi.eai.domain.Command;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Command entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandRepository extends JpaRepository<Command, Long> {
}
