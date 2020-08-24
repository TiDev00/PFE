package sn.sonatel.dsi.eai.service.impl;

import sn.sonatel.dsi.eai.service.ActionService;
import sn.sonatel.dsi.eai.domain.Action;
import sn.sonatel.dsi.eai.repository.ActionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Action}.
 */
@Service
@Transactional
public class ActionServiceImpl implements ActionService {

    private final Logger log = LoggerFactory.getLogger(ActionServiceImpl.class);

    private final ActionRepository actionRepository;

    public ActionServiceImpl(ActionRepository actionRepository) {
        this.actionRepository = actionRepository;
    }

    @Override
    public Action save(Action action) {
        log.debug("Request to save Action : {}", action);
        return actionRepository.save(action);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Action> findAll(Pageable pageable) {
        log.debug("Request to get all Actions");
        return actionRepository.findAll(pageable);
    }



    /**
     *  Get all the actions where Commands is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Action> findAllWhereCommandsIsNull() {
        log.debug("Request to get all actions where Commands is null");
        return StreamSupport
            .stream(actionRepository.findAll().spliterator(), false)
            .filter(action -> action.getCommands() == null)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Action> findOne(Long id) {
        log.debug("Request to get Action : {}", id);
        return actionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Action : {}", id);
        actionRepository.deleteById(id);
    }
}
