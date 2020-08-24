package sn.sonatel.dsi.eai.service;

import sn.sonatel.dsi.eai.domain.Server;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Server}.
 */
public interface ServerService {

    /**
     * Save a server.
     *
     * @param server the entity to save.
     * @return the persisted entity.
     */
    Server save(Server server);

    /**
     * Get all the servers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Server> findAll(Pageable pageable);


    /**
     * Get the "id" server.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Server> findOne(Long id);

    /**
     * Delete the "id" server.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
