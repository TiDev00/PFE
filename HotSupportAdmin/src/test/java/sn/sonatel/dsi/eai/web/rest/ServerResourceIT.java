package sn.sonatel.dsi.eai.web.rest;

import sn.sonatel.dsi.eai.HotSupportAdminApp;
import sn.sonatel.dsi.eai.domain.Server;
import sn.sonatel.dsi.eai.repository.ServerRepository;
import sn.sonatel.dsi.eai.service.ServerService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ServerResource} REST controller.
 */
@SpringBootTest(classes = HotSupportAdminApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ServerResourceIT {

    private static final String DEFAULT_SERVER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SERVER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IP_SERVER = "AAAAAAAAAA";
    private static final String UPDATED_IP_SERVER = "BBBBBBBBBB";

    private static final String DEFAULT_OS_SERVER = "AAAAAAAAAA";
    private static final String UPDATED_OS_SERVER = "BBBBBBBBBB";

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    @Autowired
    private ServerRepository serverRepository;

    @Autowired
    private ServerService serverService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServerMockMvc;

    private Server server;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Server createEntity(EntityManager em) {
        Server server = new Server()
            .serverName(DEFAULT_SERVER_NAME)
            .ipServer(DEFAULT_IP_SERVER)
            .osServer(DEFAULT_OS_SERVER)
            .login(DEFAULT_LOGIN)
            .password(DEFAULT_PASSWORD);
        return server;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Server createUpdatedEntity(EntityManager em) {
        Server server = new Server()
            .serverName(UPDATED_SERVER_NAME)
            .ipServer(UPDATED_IP_SERVER)
            .osServer(UPDATED_OS_SERVER)
            .login(UPDATED_LOGIN)
            .password(UPDATED_PASSWORD);
        return server;
    }

    @BeforeEach
    public void initTest() {
        server = createEntity(em);
    }

    @Test
    @Transactional
    public void createServer() throws Exception {
        int databaseSizeBeforeCreate = serverRepository.findAll().size();
        // Create the Server
        restServerMockMvc.perform(post("/api/servers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(server)))
            .andExpect(status().isCreated());

        // Validate the Server in the database
        List<Server> serverList = serverRepository.findAll();
        assertThat(serverList).hasSize(databaseSizeBeforeCreate + 1);
        Server testServer = serverList.get(serverList.size() - 1);
        assertThat(testServer.getServerName()).isEqualTo(DEFAULT_SERVER_NAME);
        assertThat(testServer.getIpServer()).isEqualTo(DEFAULT_IP_SERVER);
        assertThat(testServer.getOsServer()).isEqualTo(DEFAULT_OS_SERVER);
        assertThat(testServer.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testServer.getPassword()).isEqualTo(DEFAULT_PASSWORD);
    }

    @Test
    @Transactional
    public void createServerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serverRepository.findAll().size();

        // Create the Server with an existing ID
        server.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServerMockMvc.perform(post("/api/servers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(server)))
            .andExpect(status().isBadRequest());

        // Validate the Server in the database
        List<Server> serverList = serverRepository.findAll();
        assertThat(serverList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkServerNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = serverRepository.findAll().size();
        // set the field null
        server.setServerName(null);

        // Create the Server, which fails.


        restServerMockMvc.perform(post("/api/servers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(server)))
            .andExpect(status().isBadRequest());

        List<Server> serverList = serverRepository.findAll();
        assertThat(serverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIpServerIsRequired() throws Exception {
        int databaseSizeBeforeTest = serverRepository.findAll().size();
        // set the field null
        server.setIpServer(null);

        // Create the Server, which fails.


        restServerMockMvc.perform(post("/api/servers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(server)))
            .andExpect(status().isBadRequest());

        List<Server> serverList = serverRepository.findAll();
        assertThat(serverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLoginIsRequired() throws Exception {
        int databaseSizeBeforeTest = serverRepository.findAll().size();
        // set the field null
        server.setLogin(null);

        // Create the Server, which fails.


        restServerMockMvc.perform(post("/api/servers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(server)))
            .andExpect(status().isBadRequest());

        List<Server> serverList = serverRepository.findAll();
        assertThat(serverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPasswordIsRequired() throws Exception {
        int databaseSizeBeforeTest = serverRepository.findAll().size();
        // set the field null
        server.setPassword(null);

        // Create the Server, which fails.


        restServerMockMvc.perform(post("/api/servers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(server)))
            .andExpect(status().isBadRequest());

        List<Server> serverList = serverRepository.findAll();
        assertThat(serverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllServers() throws Exception {
        // Initialize the database
        serverRepository.saveAndFlush(server);

        // Get all the serverList
        restServerMockMvc.perform(get("/api/servers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(server.getId().intValue())))
            .andExpect(jsonPath("$.[*].serverName").value(hasItem(DEFAULT_SERVER_NAME)))
            .andExpect(jsonPath("$.[*].ipServer").value(hasItem(DEFAULT_IP_SERVER)))
            .andExpect(jsonPath("$.[*].osServer").value(hasItem(DEFAULT_OS_SERVER)))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)));
    }
    
    @Test
    @Transactional
    public void getServer() throws Exception {
        // Initialize the database
        serverRepository.saveAndFlush(server);

        // Get the server
        restServerMockMvc.perform(get("/api/servers/{id}", server.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(server.getId().intValue()))
            .andExpect(jsonPath("$.serverName").value(DEFAULT_SERVER_NAME))
            .andExpect(jsonPath("$.ipServer").value(DEFAULT_IP_SERVER))
            .andExpect(jsonPath("$.osServer").value(DEFAULT_OS_SERVER))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD));
    }
    @Test
    @Transactional
    public void getNonExistingServer() throws Exception {
        // Get the server
        restServerMockMvc.perform(get("/api/servers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServer() throws Exception {
        // Initialize the database
        serverService.save(server);

        int databaseSizeBeforeUpdate = serverRepository.findAll().size();

        // Update the server
        Server updatedServer = serverRepository.findById(server.getId()).get();
        // Disconnect from session so that the updates on updatedServer are not directly saved in db
        em.detach(updatedServer);
        updatedServer
            .serverName(UPDATED_SERVER_NAME)
            .ipServer(UPDATED_IP_SERVER)
            .osServer(UPDATED_OS_SERVER)
            .login(UPDATED_LOGIN)
            .password(UPDATED_PASSWORD);

        restServerMockMvc.perform(put("/api/servers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedServer)))
            .andExpect(status().isOk());

        // Validate the Server in the database
        List<Server> serverList = serverRepository.findAll();
        assertThat(serverList).hasSize(databaseSizeBeforeUpdate);
        Server testServer = serverList.get(serverList.size() - 1);
        assertThat(testServer.getServerName()).isEqualTo(UPDATED_SERVER_NAME);
        assertThat(testServer.getIpServer()).isEqualTo(UPDATED_IP_SERVER);
        assertThat(testServer.getOsServer()).isEqualTo(UPDATED_OS_SERVER);
        assertThat(testServer.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testServer.getPassword()).isEqualTo(UPDATED_PASSWORD);
    }

    @Test
    @Transactional
    public void updateNonExistingServer() throws Exception {
        int databaseSizeBeforeUpdate = serverRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServerMockMvc.perform(put("/api/servers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(server)))
            .andExpect(status().isBadRequest());

        // Validate the Server in the database
        List<Server> serverList = serverRepository.findAll();
        assertThat(serverList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServer() throws Exception {
        // Initialize the database
        serverService.save(server);

        int databaseSizeBeforeDelete = serverRepository.findAll().size();

        // Delete the server
        restServerMockMvc.perform(delete("/api/servers/{id}", server.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Server> serverList = serverRepository.findAll();
        assertThat(serverList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
