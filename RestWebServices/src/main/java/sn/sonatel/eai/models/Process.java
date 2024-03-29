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

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;


@Data
@Entity
@Table(name = "processes")
public class Process {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true, nullable = false)
	private String processName;
	
	@Column
	private String descProcess;
	
	@ManyToOne(optional = false)
	@JsonBackReference
	private Application application;
	
	@ManyToOne(optional = false)
	private Server server;
	
	@OneToMany(mappedBy = "processes",fetch = FetchType.EAGER)
	private Collection<Action> actions = new ArrayList<>();
	
}