package sn.sonatel.eai.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name = "logs")
public class Log {
	
	@Id  @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private long idAction;
	
	@Column(updatable = false)
	@CreationTimestamp
	private Date date;
	
	@Column
	private String osMobile;
	
	@Column
	private String metadonnees;
	
	@Column(unique = true)
	private String ipUser;	

}