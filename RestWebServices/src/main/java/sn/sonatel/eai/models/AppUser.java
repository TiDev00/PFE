package sn.sonatel.eai.models;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;


import lombok.Data;


/*
 * @Data  permet de generer les getters/setters dans le ByteCode donc plus besoin de les ecrire 
 * il est preferable de specifier @getter/@setter sur les attributs plutot que @data sur la classe
 * STS n'analyse pas le ByteCode mais que le code source donc il reconnait pas la syntaxe il faut le configurer pour utiliser lombok
 */


@Data
@Entity    //attribut (name = "") nous permettra de preciser le nom de la classe persistente sinon elle prend le nom de la classe par défaut
@Table (name = "users")   //    "           "      "       "      "     "     "   "  " la table sql sinon le nom de la classe est pris par défaut
public class AppUser {
	
	@Id
	private String matricule;
	
	@Column(name = "prenom")
	private String firstName;
	
	@Column(name = "nom")
	private String lastName;
	
	@Column
	private String email;
	
	@Column
	private String password;
	
	@OneToOne
	private Log log;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "users_services")
	private Collection<Group> services = new ArrayList<>();
	

}