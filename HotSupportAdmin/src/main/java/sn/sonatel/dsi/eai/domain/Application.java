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
 * A Application.
 */
@Entity
@Table(name = "application")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Application implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "app_name", nullable = false)
    private String appName;

    @Column(name = "desc_app")
    private String descApp;

    @OneToMany(mappedBy = "application")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Process> processes = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "applications", allowSetters = true)
    private Group service;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAppName() {
        return appName;
    }

    public Application appName(String appName) {
        this.appName = appName;
        return this;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getDescApp() {
        return descApp;
    }

    public Application descApp(String descApp) {
        this.descApp = descApp;
        return this;
    }

    public void setDescApp(String descApp) {
        this.descApp = descApp;
    }

    public Set<Process> getProcesses() {
        return processes;
    }

    public Application processes(Set<Process> processes) {
        this.processes = processes;
        return this;
    }

    public Application addProcesses(Process process) {
        this.processes.add(process);
        process.setApplication(this);
        return this;
    }

    public Application removeProcesses(Process process) {
        this.processes.remove(process);
        process.setApplication(null);
        return this;
    }

    public void setProcesses(Set<Process> processes) {
        this.processes = processes;
    }

    public Group getService() {
        return service;
    }

    public Application service(Group group) {
        this.service = group;
        return this;
    }

    public void setService(Group group) {
        this.service = group;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Application)) {
            return false;
        }
        return id != null && id.equals(((Application) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Application{" +
            "id=" + getId() +
            ", appName='" + getAppName() + "'" +
            ", descApp='" + getDescApp() + "'" +
            "}";
    }
}
