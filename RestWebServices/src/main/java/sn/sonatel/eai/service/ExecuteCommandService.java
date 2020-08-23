package sn.sonatel.eai.service;

import sn.sonatel.eai.models.Reponse;
import sn.sonatel.eai.models.Requete;

public interface ExecuteCommandService {

	Reponse commandExecutor(Requete requete);
}
