package sn.sonatel.dsi.eai.service.impl;

import sn.sonatel.dsi.eai.service.ProcessService;
import sn.sonatel.dsi.eai.domain.Process;
import sn.sonatel.dsi.eai.repository.ProcessRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Process}.
 */
@Service
@Transactional
public class ProcessServiceImpl implements ProcessService {

    private final Logger log = LoggerFactory.getLogger(ProcessServiceImpl.class);

    private final ProcessRepository processRepository;

    public ProcessServiceImpl(ProcessRepository processRepository) {
        this.processRepository = processRepository;
    }

    @Override
    public Process save(Process process) {
        log.debug("Request to save Process : {}", process);
        return processRepository.save(process);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Process> findAll(Pageable pageable) {
        log.debug("Request to get all Processes");
        return processRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Process> findOne(Long id) {
        log.debug("Request to get Process : {}", id);
        return processRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Process : {}", id);
        processRepository.deleteById(id);
    }
}
