package sn.sonatel.eai.models;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "logs")
public class Log {
	
	@Id  
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne(optional = false)
	private AppUser user;	
	
	@Column(updatable = false, nullable = false)
	private String action;
	
	@Column(updatable = false, nullable = false)
	private Date date;

	public void setDate(LocalDateTime now) {
		
	}
	

}