package sn.sonatel.eai.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.sonatel.eai.exceptions.GroupNotFoundException;
import sn.sonatel.eai.models.Group;
import sn.sonatel.eai.repositories.GroupRepository;
import sn.sonatel.eai.service.GroupService;

@Service
@Transactional
public class GroupServiceImpl implements GroupService {

	@Autowired
	private GroupRepository groupRepository; 
	
	
	
	@Override
	public Group createGroup(Group group) {
		return groupRepository.save(group);
	}

	
	@Override
	public List<Group> readGroups() {
		return groupRepository.findAll();
	}
	

	@Override
	public Group readGroup(Long id) {
		Optional<Group> group = groupRepository.findById(id);
		
		if (!group.isPresent()) {
			throw new GroupNotFoundException("Group", id);
		    } 
		else {
			  return group.get();
		    }
	}
	
	
	@Override
	public Group updateGroup(Group group) {
		Optional<Group> groupData = groupRepository.findById(group.getId());
		
		if (!groupData.isPresent()) {
			throw new GroupNotFoundException("Group", group.getId());
		    } 
		else {
			
		      return groupRepository.save(group);
		    }
	}
	

	@Override
	public Group deleteGroup(Long id) {
		Optional<Group> groupData = groupRepository.findById(id);
		if (!groupData.isPresent()) {
			throw new GroupNotFoundException("Group", id);
		    } 
		else {
			 groupRepository.deleteById(id);	
			 return groupData.get();
		    }     
	}

	
}
