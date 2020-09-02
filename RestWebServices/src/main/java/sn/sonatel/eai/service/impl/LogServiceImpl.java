package sn.sonatel.eai.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.sonatel.eai.exceptions.LogNotFoundException;
import sn.sonatel.eai.models.Log;
import sn.sonatel.eai.repositories.LogRepository;
import sn.sonatel.eai.service.LogService;

@Service
@Transactional
public class LogServiceImpl implements LogService {

	@Autowired
	private LogRepository logRepository; 
	
	@Async
	@Override
	public Log createLog(Log log) {
		return logRepository.save(log);
	}

	
	@Override
	public List<Log> readLogs() {
		return logRepository.findAll(Sort.by(Sort.Direction.ASC, "date"));
	}

}
