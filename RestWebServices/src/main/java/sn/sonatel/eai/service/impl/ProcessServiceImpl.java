package sn.sonatel.eai.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.sonatel.eai.exceptions.ProcessNotFoundException;
import sn.sonatel.eai.models.Action;
import sn.sonatel.eai.models.Process;
import sn.sonatel.eai.repositories.ProcessRepository;
import sn.sonatel.eai.service.ProcessService;

@Service
@Transactional
public class ProcessServiceImpl implements ProcessService{
	
	@Autowired
	private ProcessRepository processRepository; 
	
	
	
	@Override
	public Process createProcess(Process process) {
		return processRepository.save(process);
	}

	
	@Override
	public List<Process> readProcesses(String processName) {
		if (processName == null) {
			return processRepository.findAll(Sort.by(Sort.Direction.ASC, "processName"));			
		}
		List<Process> processes = new ArrayList<>();
		processRepository.findByProcessNameContaining(processName).forEach(processes::add);
		return processes;
	}
	

	@Override
	public Process readProcess(Long id) {
		Optional<Process> process = processRepository.findById(id);
		
		if (!process.isPresent()) {
			throw new ProcessNotFoundException("Process", id);
		    } 
		else {
			  return process.get();
		    }
	}
	
	
	@Override
	public Process updateProcess(Process process) {
		Optional<Process> processData = processRepository.findById(process.getId());
		
		if (!processData.isPresent()) {
			throw new ProcessNotFoundException("Process", process.getId());
		    } 
		else {
			
		      return processRepository.save(process);
		    }
	}
	

	@Override
	public Process deleteProcess(Long id) {
		Optional<Process> processData = processRepository.findById(id);
		if (!processData.isPresent()) {
			throw new ProcessNotFoundException("Process", id);
		    } 
		else {
			 processRepository.deleteById(id);	
			 return processData.get();
		    }     
	}


}
