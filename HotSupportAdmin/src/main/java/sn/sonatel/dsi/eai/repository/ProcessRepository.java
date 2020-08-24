package sn.sonatel.dsi.eai.repository;

import sn.sonatel.dsi.eai.domain.Process;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Process entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProcessRepository extends JpaRepository<Process, Long> {
}
