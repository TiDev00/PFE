package sn.sonatel.dsi.eai.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import sn.sonatel.dsi.eai.domain.Reponse;
import sn.sonatel.dsi.eai.domain.Requete;
import sn.sonatel.dsi.eai.service.ExecuteCommandService;

@RestController
@RequestMapping("/api/executecommand")
public class ExcuteCommandController {

    @Autowired
    private ExecuteCommandService executecommandService;


    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Reponse commandExecutor(@RequestBody Requete requete) {
        return executecommandService.commandExecutor(requete);
    }

}
