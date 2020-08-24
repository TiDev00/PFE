package sn.sonatel.dsi.eai.service.impl;

import sn.sonatel.dsi.eai.service.ServerService;
import sn.sonatel.dsi.eai.domain.Server;
import sn.sonatel.dsi.eai.repository.ServerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Server}.
 */
@Service
@Transactional
public class ServerServiceImpl implements ServerService {

    private final Logger log = LoggerFactory.getLogger(ServerServiceImpl.class);

    private final ServerRepository serverRepository;

    public ServerServiceImpl(ServerRepository serverRepository) {
        this.serverRepository = serverRepository;
    }

    @Override
    public Server save(Server server) {
        log.debug("Request to save Server : {}", server);
        return serverRepository.save(server);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Server> findAll(Pageable pageable) {
        log.debug("Request to get all Servers");
        return serverRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Server> findOne(Long id) {
        log.debug("Request to get Server : {}", id);
        return serverRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Server : {}", id);
        serverRepository.deleteById(id);
    }
}
