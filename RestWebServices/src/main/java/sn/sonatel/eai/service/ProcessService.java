package sn.sonatel.eai.service;

import java.util.List;

import sn.sonatel.eai.models.Process;

public interface ProcessService {
	
	Process createProcess(Process process);
	Process updateProcess(Process process);
	Process readProcess(Long id);
	List<Process> readProcesses(String processName);
	Process deleteProcess(Long id);

}
