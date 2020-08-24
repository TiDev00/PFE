package sn.sonatel.dsi.eai.service.impl;

import sn.sonatel.dsi.eai.service.ApplicationService;
import sn.sonatel.dsi.eai.domain.Application;
import sn.sonatel.dsi.eai.repository.ApplicationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Application}.
 */
@Service
@Transactional
public class ApplicationServiceImpl implements ApplicationService {

    private final Logger log = LoggerFactory.getLogger(ApplicationServiceImpl.class);

    private final ApplicationRepository applicationRepository;

    public ApplicationServiceImpl(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @Override
    public Application save(Application application) {
        log.debug("Request to save Application : {}", application);
        return applicationRepository.save(application);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Application> findAll(Pageable pageable) {
        log.debug("Request to get all Applications");
        return applicationRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Application> findOne(Long id) {
        log.debug("Request to get Application : {}", id);
        return applicationRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Application : {}", id);
        applicationRepository.deleteById(id);
    }
}
