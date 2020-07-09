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
	

	private Date date;
	
	@Column
	private String osMobile;
	
	@Column
	private String metadonnees;
	
	@Column
	private String channel;
	
	@Column
	private String action;
	
	@Column
	private String ipUser;	

}