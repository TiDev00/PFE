package sn.sonatel.dsi.eai.web.rest;

import sn.sonatel.dsi.eai.domain.Server;
import sn.sonatel.dsi.eai.service.ServerService;
import sn.sonatel.dsi.eai.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link sn.sonatel.dsi.eai.domain.Server}.
 */
@RestController
@RequestMapping("/api")
public class ServerResource {

    private final Logger log = LoggerFactory.getLogger(ServerResource.class);

    private static final String ENTITY_NAME = "server";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServerService serverService;

    public ServerResource(ServerService serverService) {
        this.serverService = serverService;
    }

    /**
     * {@code POST  /servers} : Create a new server.
     *
     * @param server the server to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new server, or with status {@code 400 (Bad Request)} if the server has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/servers")
    public ResponseEntity<Server> createServer(@Valid @RequestBody Server server) throws URISyntaxException {
        log.debug("REST request to save Server : {}", server);
        if (server.getId() != null) {
            throw new BadRequestAlertException("A new server cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Server result = serverService.save(server);
        return ResponseEntity.created(new URI("/api/servers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /servers} : Updates an existing server.
     *
     * @param server the server to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated server,
     * or with status {@code 400 (Bad Request)} if the server is not valid,
     * or with status {@code 500 (Internal Server Error)} if the server couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/servers")
    public ResponseEntity<Server> updateServer(@Valid @RequestBody Server server) throws URISyntaxException {
        log.debug("REST request to update Server : {}", server);
        if (server.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Server result = serverService.save(server);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, server.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /servers} : get all the servers.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of servers in body.
     */
    @GetMapping("/servers")
    public ResponseEntity<List<Server>> getAllServers(Pageable pageable) {
        log.debug("REST request to get a page of Servers");
        Page<Server> page = serverService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /servers/:id} : get the "id" server.
     *
     * @param id the id of the server to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the server, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/servers/{id}")
    public ResponseEntity<Server> getServer(@PathVariable Long id) {
        log.debug("REST request to get Server : {}", id);
        Optional<Server> server = serverService.findOne(id);
        return ResponseUtil.wrapOrNotFound(server);
    }

    /**
     * {@code DELETE  /servers/:id} : delete the "id" server.
     *
     * @param id the id of the server to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/servers/{id}")
    public ResponseEntity<Void> deleteServer(@PathVariable Long id) {
        log.debug("REST request to delete Server : {}", id);
        serverService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
