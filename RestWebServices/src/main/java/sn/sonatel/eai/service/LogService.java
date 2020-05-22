package sn.sonatel.eai.service;

import java.util.List;

import sn.sonatel.eai.models.Log;

public interface LogService {
	
	Log createLog(Log log);
	Log updateLog(Log log);
	Log readLog(Long id);
	List<Log> readLogs();
	Log deleteLog(Long id);

}
