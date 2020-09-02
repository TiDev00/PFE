package sn.sonatel.eai.security;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.naming.Context;
import javax.naming.NamingException;
import javax.naming.directory.InitialDirContext;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import sn.sonatel.eai.models.AppUser;
import sn.sonatel.eai.models.Log;
import sn.sonatel.eai.service.LogService;



public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	
	private AuthenticationManager authenticationManager;
	
	@Resource
	private LogService logService; 
	
	private static final Logger LOGGER = Logger.getLogger(JWTAuthenticationFilter.class.getName());
	
	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		//Log log = new Log();
		
		try {
			AppUser appUser = new ObjectMapper().readValue(request.getInputStream(), AppUser.class);
			
			/*
			 * log.setMatricule(appUser.getMatricule());
			 * log.setAction("SUCCESSFUL_AUTHENTICATION"); 
			 * log.setDate(LocalDateTime.now());
			 * log.setChannel("test"); 
			 * log.setMetadonnees("metadonnees");
			 * log.setOsMobile(""); 
			 * logService.createLog(log);
			 */
			
			if(!isMemberOfSonatel(appUser.getMatricule(), appUser.getPassword())) {
				
				return authenticationManager
						.authenticate(
								new UsernamePasswordAuthenticationToken(appUser.getMatricule(), appUser.getPassword())
								);
			}
			
			throw new RuntimeException();
			
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		
	}
	
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		
		 User user=(User)authResult.getPrincipal();
	        List<String> profiles=new ArrayList<>();
	        authResult.getAuthorities().forEach(a -> profiles.add(a.getAuthority()));
	        
	        
	        String jwt= JWT.create()
	                .withIssuer(request.getRequestURI())
	                .withSubject(user.getUsername())
	                .withArrayClaim("profiles",profiles.toArray(new String[profiles.size()]))
	                .withExpiresAt(new Date(System.currentTimeMillis()+SecurityConstants.EXPIRATION_TIME))
	                .sign(Algorithm.HMAC256(SecurityConstants.SECRET));
	       
	        response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + jwt);
	        
	}
	
	
	
	public boolean isMemberOfSonatel(String login, String password) {

		try {

			String urlLDAP = "Ldap://orange-sonatel.com/dc=orange-sonatel,dc=com";

			Properties env = new Properties();

			env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
			env.put(Context.PROVIDER_URL, urlLDAP);

			env.put(Context.SECURITY_AUTHENTICATION, "simple");
			env.put(Context.SECURITY_PRINCIPAL, login + "@orange-sonatel.com");
			env.put(Context.SECURITY_CREDENTIALS, password);

			new InitialDirContext(env);

			return true;

		} 
		catch (NamingException e) {

			LOGGER.log(Level.SEVERE, "Utilisateur LDAP non trouve");

			return false;

		}

	}


}
