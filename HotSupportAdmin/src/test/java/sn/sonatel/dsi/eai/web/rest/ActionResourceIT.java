package sn.sonatel.dsi.eai.web.rest;

import sn.sonatel.dsi.eai.HotSupportAdminApp;
import sn.sonatel.dsi.eai.domain.Action;
import sn.sonatel.dsi.eai.repository.ActionRepository;
import sn.sonatel.dsi.eai.service.ActionService;

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
 * Integration tests for the {@link ActionResource} REST controller.
 */
@SpringBootTest(classes = HotSupportAdminApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ActionResourceIT {

    private static final String DEFAULT_ACTION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ACTION_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESC_ACTION = "AAAAAAAAAA";
    private static final String UPDATED_DESC_ACTION = "BBBBBBBBBB";

    @Autowired
    private ActionRepository actionRepository;

    @Autowired
    private ActionService actionService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restActionMockMvc;

    private Action action;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Action createEntity(EntityManager em) {
        Action action = new Action()
            .actionName(DEFAULT_ACTION_NAME)
            .descAction(DEFAULT_DESC_ACTION);
        return action;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Action createUpdatedEntity(EntityManager em) {
        Action action = new Action()
            .actionName(UPDATED_ACTION_NAME)
            .descAction(UPDATED_DESC_ACTION);
        return action;
    }

    @BeforeEach
    public void initTest() {
        action = createEntity(em);
    }

    @Test
    @Transactional
    public void createAction() throws Exception {
        int databaseSizeBeforeCreate = actionRepository.findAll().size();
        // Create the Action
        restActionMockMvc.perform(post("/api/actions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(action)))
            .andExpect(status().isCreated());

        // Validate the Action in the database
        List<Action> actionList = actionRepository.findAll();
        assertThat(actionList).hasSize(databaseSizeBeforeCreate + 1);
        Action testAction = actionList.get(actionList.size() - 1);
        assertThat(testAction.getActionName()).isEqualTo(DEFAULT_ACTION_NAME);
        assertThat(testAction.getDescAction()).isEqualTo(DEFAULT_DESC_ACTION);
    }

    @Test
    @Transactional
    public void createActionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = actionRepository.findAll().size();

        // Create the Action with an existing ID
        action.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restActionMockMvc.perform(post("/api/actions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(action)))
            .andExpect(status().isBadRequest());

        // Validate the Action in the database
        List<Action> actionList = actionRepository.findAll();
        assertThat(actionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkActionNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = actionRepository.findAll().size();
        // set the field null
        action.setActionName(null);

        // Create the Action, which fails.


        restActionMockMvc.perform(post("/api/actions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(action)))
            .andExpect(status().isBadRequest());

        List<Action> actionList = actionRepository.findAll();
        assertThat(actionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllActions() throws Exception {
        // Initialize the database
        actionRepository.saveAndFlush(action);

        // Get all the actionList
        restActionMockMvc.perform(get("/api/actions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(action.getId().intValue())))
            .andExpect(jsonPath("$.[*].actionName").value(hasItem(DEFAULT_ACTION_NAME)))
            .andExpect(jsonPath("$.[*].descAction").value(hasItem(DEFAULT_DESC_ACTION)));
    }
    
    @Test
    @Transactional
    public void getAction() throws Exception {
        // Initialize the database
        actionRepository.saveAndFlush(action);

        // Get the action
        restActionMockMvc.perform(get("/api/actions/{id}", action.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(action.getId().intValue()))
            .andExpect(jsonPath("$.actionName").value(DEFAULT_ACTION_NAME))
            .andExpect(jsonPath("$.descAction").value(DEFAULT_DESC_ACTION));
    }
    @Test
    @Transactional
    public void getNonExistingAction() throws Exception {
        // Get the action
        restActionMockMvc.perform(get("/api/actions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAction() throws Exception {
        // Initialize the database
        actionService.save(action);

        int databaseSizeBeforeUpdate = actionRepository.findAll().size();

        // Update the action
        Action updatedAction = actionRepository.findById(action.getId()).get();
        // Disconnect from session so that the updates on updatedAction are not directly saved in db
        em.detach(updatedAction);
        updatedAction
            .actionName(UPDATED_ACTION_NAME)
            .descAction(UPDATED_DESC_ACTION);

        restActionMockMvc.perform(put("/api/actions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAction)))
            .andExpect(status().isOk());

        // Validate the Action in the database
        List<Action> actionList = actionRepository.findAll();
        assertThat(actionList).hasSize(databaseSizeBeforeUpdate);
        Action testAction = actionList.get(actionList.size() - 1);
        assertThat(testAction.getActionName()).isEqualTo(UPDATED_ACTION_NAME);
        assertThat(testAction.getDescAction()).isEqualTo(UPDATED_DESC_ACTION);
    }

    @Test
    @Transactional
    public void updateNonExistingAction() throws Exception {
        int databaseSizeBeforeUpdate = actionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restActionMockMvc.perform(put("/api/actions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(action)))
            .andExpect(status().isBadRequest());

        // Validate the Action in the database
        List<Action> actionList = actionRepository.findAll();
        assertThat(actionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAction() throws Exception {
        // Initialize the database
        actionService.save(action);

        int databaseSizeBeforeDelete = actionRepository.findAll().size();

        // Delete the action
        restActionMockMvc.perform(delete("/api/actions/{id}", action.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Action> actionList = actionRepository.findAll();
        assertThat(actionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
