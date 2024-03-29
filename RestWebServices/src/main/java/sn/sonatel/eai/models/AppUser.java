package sn.sonatel.eai.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import javax.persistence.Table;



import lombok.Data;


/*
 * @Data  permet de generer les getters/setters dans le ByteCode donc plus besoin de les ecrire 
 * il est preferable de specifier @getter/@setter sur les attributs plutot que @data sur la classe
 * STS n'analyse pas le ByteCode mais que le code source donc il reconnait pas la syntaxe il faut le configurer pour utiliser lombok
 */


@Data
@Entity    
@Table (name = "users")
public class AppUser {
	
	@Id
	@Column(unique = true, updatable = false, nullable = false)
	private String matricule;
	
	@Column
	private String firstName;
	
	@Column
	private String lastName;
	
	@Column(unique = true)
	private String email;
	
	@Column
	private String password;
	
	@ManyToOne(optional = false)
	private Group service;
	
}