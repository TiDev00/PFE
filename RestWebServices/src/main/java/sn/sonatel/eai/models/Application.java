package sn.sonatel.eai.models;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "applications")
public class Application {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true)
	private String appName;
	
	@Column
	private String descApp;
	
	@ManyToOne
	private Group service;
	
	@OneToMany(mappedBy = "application",fetch = FetchType.EAGER)
	private Collection<Process> processes = new ArrayList<>();
	
}