package sn.sonatel.dsi.eai.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Group.
 */
@Entity
@Table(name = "jhi_group")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Group implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "service_name", nullable = false)
    private String serviceName;

    @Column(name = "desc_service")
    private String descService;

    @OneToMany(mappedBy = "service")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "service")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Application> applications = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public Group serviceName(String serviceName) {
        this.serviceName = serviceName;
        return this;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getDescService() {
        return descService;
    }

    public Group descService(String descService) {
        this.descService = descService;
        return this;
    }

    public void setDescService(String descService) {
        this.descService = descService;
    }

    public Set<Application> getApplications() {
        return applications;
    }

    public Group applications(Set<Application> applications) {
        this.applications = applications;
        return this;
    }

    public Group addApplications(Application application) {
        this.applications.add(application);
        application.setService(this);
        return this;
    }

    public Group removeApplications(Application application) {
        this.applications.remove(application);
        application.setService(null);
        return this;
    }

    public void setApplications(Set<Application> applications) {
        this.applications = applications;
    }

    public Set<User> getUsers() {
        return users;
    }

    public Group users(Set<User> users) {
        this.users = users;
        return this;
    }

    public Group addUsers(User user) {
        this.users.add(user);
        user.setService(this);
        return this;
    }

    public Group removeUsers(User user) {
        this.users.remove(user);
        user.setService(null);
        return this;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Group)) {
            return false;
        }
        return id != null && id.equals(((Group) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Group{" +
            "id=" + getId() +
            ", serviceName='" + getServiceName() + "'" +
            ", descService='" + getDescService() + "'" +
            "}";
    }
}
