package sn.sonatel.eai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import sn.sonatel.eai.models.Requete;
import sn.sonatel.eai.service.ExecuteCommandService;

@RestController
@RequestMapping("/executecommand")
public class ExcuteCommandController {
	
	@Autowired
	private ExecuteCommandService executecommandService;
	
	
	@PostMapping
	@ResponseStatus(HttpStatus.OK)
	public String commandExecutor(@RequestBody Requete requete) {
		return executecommandService.commandExecutor(requete);
	}

}
