package sn.sonatel.eai.service;

import java.util.List;

import sn.sonatel.eai.models.Application;

public interface ApplicationService {
	
	Application createApplication(Application application);
	Application updateApplication(Application application);
	Application readApplication(Long id);
	List<Application> readApplications(String appName);
	Application deleteApplication(Long id);

}
