package sn.sonatel.eai.service;

import java.util.List;

import sn.sonatel.eai.models.Server;

public interface ServerService {
	
	Server createServer(Server server);
	Server updateServer(Server server);
	Server readServer(Long id);
	List<Server> readServers(String serverName);
	Server deleteServer(Long id);

}
