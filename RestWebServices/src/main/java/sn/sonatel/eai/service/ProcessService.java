package sn.sonatel.eai.service;

import java.util.List;

import sn.sonatel.eai.models.Process;

public interface ProcessService {
	
	Process createProcess(Process process);
	Process updateProcess(Process process);
	Process readProcess(Long id);
	List<Process> readProcesses();
	Process deleteProcess(Long id);

}
