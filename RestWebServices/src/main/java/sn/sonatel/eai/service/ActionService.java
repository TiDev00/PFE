package sn.sonatel.eai.service;

import java.util.List;

import sn.sonatel.eai.models.Action;

public interface ActionService {
	
	Action createAction(Action action);
	Action updateAction(Action action);
	Action readAction(Long id);
	List<Action> readActions();
	Action deleteAction(Long id);

}
