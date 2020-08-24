package sn.sonatel.dsi.eai.service;

import sn.sonatel.dsi.eai.domain.Process;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Process}.
 */
public interface ProcessService {

    /**
     * Save a process.
     *
     * @param process the entity to save.
     * @return the persisted entity.
     */
    Process save(Process process);

    /**
     * Get all the processes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Process> findAll(Pageable pageable);


    /**
     * Get the "id" process.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Process> findOne(Long id);

    /**
     * Delete the "id" process.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
