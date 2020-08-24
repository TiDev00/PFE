package sn.sonatel.dsi.eai.web.rest;

import sn.sonatel.dsi.eai.HotSupportAdminApp;
import sn.sonatel.dsi.eai.domain.Process;
import sn.sonatel.dsi.eai.repository.ProcessRepository;
import sn.sonatel.dsi.eai.service.ProcessService;

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
 * Integration tests for the {@link ProcessResource} REST controller.
 */
@SpringBootTest(classes = HotSupportAdminApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProcessResourceIT {

    private static final String DEFAULT_PROCESS_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROCESS_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESC_PROCESS = "AAAAAAAAAA";
    private static final String UPDATED_DESC_PROCESS = "BBBBBBBBBB";

    @Autowired
    private ProcessRepository processRepository;

    @Autowired
    private ProcessService processService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProcessMockMvc;

    private Process process;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Process createEntity(EntityManager em) {
        Process process = new Process()
            .processName(DEFAULT_PROCESS_NAME)
            .descProcess(DEFAULT_DESC_PROCESS);
        return process;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Process createUpdatedEntity(EntityManager em) {
        Process process = new Process()
            .processName(UPDATED_PROCESS_NAME)
            .descProcess(UPDATED_DESC_PROCESS);
        return process;
    }

    @BeforeEach
    public void initTest() {
        process = createEntity(em);
    }

    @Test
    @Transactional
    public void createProcess() throws Exception {
        int databaseSizeBeforeCreate = processRepository.findAll().size();
        // Create the Process
        restProcessMockMvc.perform(post("/api/processes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(process)))
            .andExpect(status().isCreated());

        // Validate the Process in the database
        List<Process> processList = processRepository.findAll();
        assertThat(processList).hasSize(databaseSizeBeforeCreate + 1);
        Process testProcess = processList.get(processList.size() - 1);
        assertThat(testProcess.getProcessName()).isEqualTo(DEFAULT_PROCESS_NAME);
        assertThat(testProcess.getDescProcess()).isEqualTo(DEFAULT_DESC_PROCESS);
    }

    @Test
    @Transactional
    public void createProcessWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = processRepository.findAll().size();

        // Create the Process with an existing ID
        process.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProcessMockMvc.perform(post("/api/processes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(process)))
            .andExpect(status().isBadRequest());

        // Validate the Process in the database
        List<Process> processList = processRepository.findAll();
        assertThat(processList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkProcessNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = processRepository.findAll().size();
        // set the field null
        process.setProcessName(null);

        // Create the Process, which fails.


        restProcessMockMvc.perform(post("/api/processes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(process)))
            .andExpect(status().isBadRequest());

        List<Process> processList = processRepository.findAll();
        assertThat(processList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProcesses() throws Exception {
        // Initialize the database
        processRepository.saveAndFlush(process);

        // Get all the processList
        restProcessMockMvc.perform(get("/api/processes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(process.getId().intValue())))
            .andExpect(jsonPath("$.[*].processName").value(hasItem(DEFAULT_PROCESS_NAME)))
            .andExpect(jsonPath("$.[*].descProcess").value(hasItem(DEFAULT_DESC_PROCESS)));
    }
    
    @Test
    @Transactional
    public void getProcess() throws Exception {
        // Initialize the database
        processRepository.saveAndFlush(process);

        // Get the process
        restProcessMockMvc.perform(get("/api/processes/{id}", process.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(process.getId().intValue()))
            .andExpect(jsonPath("$.processName").value(DEFAULT_PROCESS_NAME))
            .andExpect(jsonPath("$.descProcess").value(DEFAULT_DESC_PROCESS));
    }
    @Test
    @Transactional
    public void getNonExistingProcess() throws Exception {
        // Get the process
        restProcessMockMvc.perform(get("/api/processes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProcess() throws Exception {
        // Initialize the database
        processService.save(process);

        int databaseSizeBeforeUpdate = processRepository.findAll().size();

        // Update the process
        Process updatedProcess = processRepository.findById(process.getId()).get();
        // Disconnect from session so that the updates on updatedProcess are not directly saved in db
        em.detach(updatedProcess);
        updatedProcess
            .processName(UPDATED_PROCESS_NAME)
            .descProcess(UPDATED_DESC_PROCESS);

        restProcessMockMvc.perform(put("/api/processes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProcess)))
            .andExpect(status().isOk());

        // Validate the Process in the database
        List<Process> processList = processRepository.findAll();
        assertThat(processList).hasSize(databaseSizeBeforeUpdate);
        Process testProcess = processList.get(processList.size() - 1);
        assertThat(testProcess.getProcessName()).isEqualTo(UPDATED_PROCESS_NAME);
        assertThat(testProcess.getDescProcess()).isEqualTo(UPDATED_DESC_PROCESS);
    }

    @Test
    @Transactional
    public void updateNonExistingProcess() throws Exception {
        int databaseSizeBeforeUpdate = processRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProcessMockMvc.perform(put("/api/processes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(process)))
            .andExpect(status().isBadRequest());

        // Validate the Process in the database
        List<Process> processList = processRepository.findAll();
        assertThat(processList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProcess() throws Exception {
        // Initialize the database
        processService.save(process);

        int databaseSizeBeforeDelete = processRepository.findAll().size();

        // Delete the process
        restProcessMockMvc.perform(delete("/api/processes/{id}", process.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Process> processList = processRepository.findAll();
        assertThat(processList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
