package sn.sonatel.dsi.eai.service;

import sn.sonatel.dsi.eai.domain.Reponse;
import sn.sonatel.dsi.eai.domain.Requete;

public interface ExecuteCommandService {

    Reponse commandExecutor(Requete requete);
}
