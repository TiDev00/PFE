package sn.sonatel.eai.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.sonatel.eai.exceptions.CommandNotFoundException;
import sn.sonatel.eai.models.Action;
import sn.sonatel.eai.models.Command;
import sn.sonatel.eai.repositories.CommandRepository;
import sn.sonatel.eai.service.CommandService;

@Service
@Transactional
public class CommandServiceImpl implements CommandService{
	
	@Autowired
	private CommandRepository commandRepository; 
	
	
	
	@Override
	public Command createCommand(Command command) {
		return commandRepository.save(command);
	}

	
	@Override
	public List<Command> readCommands(String commandName) {
		if (commandName == null) {
			return commandRepository.findAll(Sort.by(Sort.Direction.ASC, "commandName"));			
		}
		List<Command> commands = new ArrayList<>();
		commandRepository.findByCommandNameContaining(commandName).forEach(commands::add);
		return commands;
	}
	

	@Override
	public Command readCommand(Long id) {
		Optional<Command> command = commandRepository.findById(id);
		
		if (!command.isPresent()) {
			throw new CommandNotFoundException("Command", id);
		    } 
		else {
			  return command.get();
		    }
	}
	
	
	@Override
	public Command updateCommand(Command command) {
		Optional<Command> commandData = commandRepository.findById(command.getId());
		
		if (!commandData.isPresent()) {
			throw new CommandNotFoundException("Command", command.getId());
		    } 
		else {
			
		      return commandRepository.save(command);
		    }
	}
	

	@Override
	public Command deleteCommand(Long id) {
		Optional<Command> commandData = commandRepository.findById(id);
		if (!commandData.isPresent()) {
			throw new CommandNotFoundException("Command", id);
		    } 
		else {
			 commandRepository.deleteById(id);	
			 return commandData.get();
		    }     
	}


}
