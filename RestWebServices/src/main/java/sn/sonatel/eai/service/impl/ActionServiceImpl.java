package sn.sonatel.eai.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.sonatel.eai.exceptions.ActionNotFoundException;
import sn.sonatel.eai.models.Action;
import sn.sonatel.eai.repositories.ActionRepository;
import sn.sonatel.eai.service.ActionService;

@Service
@Transactional
public class ActionServiceImpl implements ActionService{
	
	@Autowired
	private ActionRepository actionRepository; 
	
	
	
	@Override
	public Action createAction(Action action) {
		return actionRepository.save(action);
	}

	
	@Override
	public List<Action> readActions(String actionName) {
		if (actionName == null) {
			return actionRepository.findAll(Sort.by(Sort.Direction.ASC, "actionName"));			
		}
		List<Action> actions = new ArrayList<>();
		actionRepository.findByActionNameContaining(actionName).forEach(actions::add);
		return actions;
	}
	
	

	@Override
	public Action readAction(Long id) {
		Optional<Action> action = actionRepository.findById(id);
		
		if (!action.isPresent()) {
			throw new ActionNotFoundException("Action", id);
		    } 
		else {
			  return action.get();
		    }
	}
	
	
	@Override
	public Action updateAction(Action action) {
		Optional<Action> actionData = actionRepository.findById(action.getId());
		
		if (!actionData.isPresent()) {
			throw new ActionNotFoundException("Action", action.getId());
		    } 
		else {
			
		      return actionRepository.save(action);
		    }
	}
	

	@Override
	public Action deleteAction(Long id) {
		Optional<Action> actionData = actionRepository.findById(id);
		if (!actionData.isPresent()) {
			throw new ActionNotFoundException("Action", id);
		    } 
		else {
			 actionRepository.deleteById(id);	
			 return actionData.get();
		    }     
	}


}
