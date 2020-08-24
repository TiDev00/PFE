package sn.sonatel.dsi.eai.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Command.
 */
@Entity
@Table(name = "command")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Command implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "command_name", nullable = false)
    private String commandName;

    @Column(name = "desc_command")
    private String descCommand;

    @OneToOne
    @JoinColumn(unique = true)
    private Action actions;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommandName() {
        return commandName;
    }

    public Command commandName(String commandName) {
        this.commandName = commandName;
        return this;
    }

    public void setCommandName(String commandName) {
        this.commandName = commandName;
    }

    public String getDescCommand() {
        return descCommand;
    }

    public Command descCommand(String descCommand) {
        this.descCommand = descCommand;
        return this;
    }

    public void setDescCommand(String descCommand) {
        this.descCommand = descCommand;
    }

    public Action getActions() {
        return actions;
    }

    public Command actions(Action action) {
        this.actions = action;
        return this;
    }

    public void setActions(Action action) {
        this.actions = action;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Command)) {
            return false;
        }
        return id != null && id.equals(((Command) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Command{" +
            "id=" + getId() +
            ", commandName='" + getCommandName() + "'" +
            ", descCommand='" + getDescCommand() + "'" +
            "}";
    }
}
