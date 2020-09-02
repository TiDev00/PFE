package sn.sonatel.eai.service;

import java.util.List;

import sn.sonatel.eai.models.Command;

public interface CommandService {
	
	Command createCommand(Command command);
	Command updateCommand(Command command);
	Command readCommand(Long id);
	List<Command> readCommands(String commandName);
	Command deleteCommand(Long id);


}
