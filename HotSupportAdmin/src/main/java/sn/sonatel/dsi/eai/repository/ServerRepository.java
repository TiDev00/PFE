package sn.sonatel.dsi.eai.repository;

import sn.sonatel.dsi.eai.domain.Server;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Server entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServerRepository extends JpaRepository<Server, Long> {
}
