package sn.sonatel.dsi.eai.service;

import sn.sonatel.dsi.eai.domain.Action;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Action}.
 */
public interface ActionService {

    /**
     * Save a action.
     *
     * @param action the entity to save.
     * @return the persisted entity.
     */
    Action save(Action action);

    /**
     * Get all the actions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Action> findAll(Pageable pageable);
    /**
     * Get all the ActionDTO where Commands is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<Action> findAllWhereCommandsIsNull();


    /**
     * Get the "id" action.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Action> findOne(Long id);

    /**
     * Delete the "id" action.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
