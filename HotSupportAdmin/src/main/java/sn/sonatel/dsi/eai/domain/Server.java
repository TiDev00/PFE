package sn.sonatel.dsi.eai.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Server.
 */
@Entity
@Table(name = "server")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Server implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "server_name", nullable = false)
    private String serverName;

    @NotNull
    @Column(name = "ip_server", nullable = false)
    private String ipServer;

    @Column(name = "os_server")
    private String osServer;

    @NotNull
    @Column(name = "login", nullable = false)
    private String login;

    @NotNull
    @Column(name = "password", nullable = false)
    private String password;

    @OneToMany(mappedBy = "server")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Process> processes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServerName() {
        return serverName;
    }

    public Server serverName(String serverName) {
        this.serverName = serverName;
        return this;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public String getIpServer() {
        return ipServer;
    }

    public Server ipServer(String ipServer) {
        this.ipServer = ipServer;
        return this;
    }

    public void setIpServer(String ipServer) {
        this.ipServer = ipServer;
    }

    public String getOsServer() {
        return osServer;
    }

    public Server osServer(String osServer) {
        this.osServer = osServer;
        return this;
    }

    public void setOsServer(String osServer) {
        this.osServer = osServer;
    }

    public String getLogin() {
        return login;
    }

    public Server login(String login) {
        this.login = login;
        return this;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public Server password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Process> getProcesses() {
        return processes;
    }

    public Server processes(Set<Process> processes) {
        this.processes = processes;
        return this;
    }

    public Server addProcesses(Process process) {
        this.processes.add(process);
        process.setServer(this);
        return this;
    }

    public Server removeProcesses(Process process) {
        this.processes.remove(process);
        process.setServer(null);
        return this;
    }

    public void setProcesses(Set<Process> processes) {
        this.processes = processes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Server)) {
            return false;
        }
        return id != null && id.equals(((Server) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Server{" +
            "id=" + getId() +
            ", serverName='" + getServerName() + "'" +
            ", ipServer='" + getIpServer() + "'" +
            ", osServer='" + getOsServer() + "'" +
            ", login='" + getLogin() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
