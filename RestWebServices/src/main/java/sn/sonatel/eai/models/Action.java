package sn.sonatel.eai.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;


@Data
@Entity
@Table(name = "actions")
public class Action {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true)
	private String actionName;
	
	@Column
	private String descAction;
	
	@ManyToOne
	@JsonBackReference
	private Process processes;
	
	@OneToOne(mappedBy = "actions")
	private Command commands;
}