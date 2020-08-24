package sn.sonatel.dsi.eai.service.impl;

import sn.sonatel.dsi.eai.service.CommandService;
import sn.sonatel.dsi.eai.domain.Command;
import sn.sonatel.dsi.eai.repository.CommandRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Command}.
 */
@Service
@Transactional
public class CommandServiceImpl implements CommandService {

    private final Logger log = LoggerFactory.getLogger(CommandServiceImpl.class);

    private final CommandRepository commandRepository;

    public CommandServiceImpl(CommandRepository commandRepository) {
        this.commandRepository = commandRepository;
    }

    @Override
    public Command save(Command command) {
        log.debug("Request to save Command : {}", command);
        return commandRepository.save(command);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Command> findAll(Pageable pageable) {
        log.debug("Request to get all Commands");
        return commandRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Command> findOne(Long id) {
        log.debug("Request to get Command : {}", id);
        return commandRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Command : {}", id);
        commandRepository.deleteById(id);
    }
}
