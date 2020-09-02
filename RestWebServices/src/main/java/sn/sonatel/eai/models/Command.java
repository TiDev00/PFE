package sn.sonatel.eai.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

enum StatusType {
	
	NO ("No"),
	YES ("Yes");
	
	private final String name;
	
	StatusType(String name){
		this.name = name;
	}
}

@Data
@Entity
@Table(name = "commands")
public class Command {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true)
	private String commandName;
	
	@Column
	private String descCommand;
	
	@Column
	private StatusType forStatus;
	
	@OneToOne
	@JsonBackReference
	private Action actions;
	
}