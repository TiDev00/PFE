package sn.sonatel.dsi.eai.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Action.
 */
@Entity
@Table(name = "action")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Action implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "action_name", nullable = false)
    private String actionName;

    @Column(name = "desc_action")
    private String descAction;

    @ManyToOne
    @JsonIgnoreProperties(value = "actions", allowSetters = true)
    private Process process;

    @OneToOne(mappedBy = "actions")
    @JsonIgnore
    private Command commands;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getActionName() {
        return actionName;
    }

    public Action actionName(String actionName) {
        this.actionName = actionName;
        return this;
    }

    public void setActionName(String actionName) {
        this.actionName = actionName;
    }

    public String getDescAction() {
        return descAction;
    }

    public Action descAction(String descAction) {
        this.descAction = descAction;
        return this;
    }

    public void setDescAction(String descAction) {
        this.descAction = descAction;
    }

    public Process getProcess() {
        return process;
    }

    public Action process(Process process) {
        this.process = process;
        return this;
    }

    public void setProcess(Process process) {
        this.process = process;
    }

    public Command getCommands() {
        return commands;
    }

    public Action commands(Command command) {
        this.commands = command;
        return this;
    }

    public void setCommands(Command command) {
        this.commands = command;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Action)) {
            return false;
        }
        return id != null && id.equals(((Action) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Action{" +
            "id=" + getId() +
            ", actionName='" + getActionName() + "'" +
            ", descAction='" + getDescAction() + "'" +
            "}";
    }
}
