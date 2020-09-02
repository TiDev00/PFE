package sn.sonatel.eai.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.sonatel.eai.exceptions.ApplicationNotFoundException;
import sn.sonatel.eai.models.Action;
import sn.sonatel.eai.models.Application;
import sn.sonatel.eai.repositories.ApplicationRepository;
import sn.sonatel.eai.service.ApplicationService;

@Service
@Transactional
public class ApplicationServiceImpl implements ApplicationService {

	@Autowired
	private ApplicationRepository applicationRepository; 
	
	
	
	@Override
	public Application createApplication(Application application) {
		return applicationRepository.save(application);
	}

	
	@Override
	public List<Application> readApplications(String appName) {
		if (appName == null) {
			return applicationRepository.findAll(Sort.by(Sort.Direction.ASC, "appName"));			
		}
		List<Application> applications = new ArrayList<>();
		applicationRepository.findByAppNameContaining(appName).forEach(applications::add);
		return applications;
	}
	
	

	@Override
	public Application readApplication(Long id) {
		Optional<Application> application = applicationRepository.findById(id);
		
		if (!application.isPresent()) {
			throw new ApplicationNotFoundException("Application", id);
		    } 
		else {
			  return application.get();
		    }
	}
	
	
	@Override
	public Application updateApplication(Application application) {
		Optional<Application> applicationData = applicationRepository.findById(application.getId());
		
		if (!applicationData.isPresent()) {
			throw new ApplicationNotFoundException("Application", application.getId());
		    } 
		else {
			
		      return applicationRepository.save(application);
		    }
	}
	

	@Override
	public Application deleteApplication(Long id) {
		Optional<Application> applicationData = applicationRepository.findById(id);
		if (!applicationData.isPresent()) {
			throw new ApplicationNotFoundException("Application", id);
		    } 
		else {
			 applicationRepository.deleteById(id);	
			 return applicationData.get();
		    }     
	}

	
}
