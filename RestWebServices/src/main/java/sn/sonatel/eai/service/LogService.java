package sn.sonatel.eai.service;

import java.util.List;

import sn.sonatel.eai.models.Log;

public interface LogService {
	
	Log createLog(Log log);
	List<Log> readLogs();
	
}
