package sn.sonatel.eai.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "servers")
public class Server {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true, nullable = false)
	private String serverName;
	
	@Column(unique = true, nullable = false)
	private String ipServer;
	
	@Column
	private String osServer;
	
	@Column(nullable = false)
	private String login;
	
	@Column(nullable = false)
	private String password;
}