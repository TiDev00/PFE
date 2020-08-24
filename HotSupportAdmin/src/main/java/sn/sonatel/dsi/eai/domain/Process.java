package sn.sonatel.dsi.eai.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Process.
 */
@Entity
@Table(name = "process")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Process implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "process_name", nullable = false)
    private String processName;

    @Column(name = "desc_process")
    private String descProcess;

    @OneToMany(mappedBy = "process")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Action> actions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "processes", allowSetters = true)
    private Application application;

    @ManyToOne
    @JsonIgnoreProperties(value = "processes", allowSetters = true)
    private Server server;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProcessName() {
        return processName;
    }

    public Process processName(String processName) {
        this.processName = processName;
        return this;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public String getDescProcess() {
        return descProcess;
    }

    public Process descProcess(String descProcess) {
        this.descProcess = descProcess;
        return this;
    }

    public void setDescProcess(String descProcess) {
        this.descProcess = descProcess;
    }

    public Set<Action> getActions() {
        return actions;
    }

    public Process actions(Set<Action> actions) {
        this.actions = actions;
        return this;
    }

    public Process addActions(Action action) {
        this.actions.add(action);
        action.setProcess(this);
        return this;
    }

    public Process removeActions(Action action) {
        this.actions.remove(action);
        action.setProcess(null);
        return this;
    }

    public void setActions(Set<Action> actions) {
        this.actions = actions;
    }

    public Application getApplication() {
        return application;
    }

    public Process application(Application application) {
        this.application = application;
        return this;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public Server getServer() {
        return server;
    }

    public Process server(Server server) {
        this.server = server;
        return this;
    }

    public void setServer(Server server) {
        this.server = server;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Process)) {
            return false;
        }
        return id != null && id.equals(((Process) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Process{" +
            "id=" + getId() +
            ", processName='" + getProcessName() + "'" +
            ", descProcess='" + getDescProcess() + "'" +
            "}";
    }
}
