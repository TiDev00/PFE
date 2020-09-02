package sn.sonatel.eai.service;

import java.util.List;

import sn.sonatel.eai.models.Group;

public interface GroupService {
	
	Group createGroup(Group group);
	Group updateGroup(Group group);
	Group readGroup(Long id);
	List<Group> readGroups(String serviceName);
	Group deleteGroup(Long id);
	
	
}
