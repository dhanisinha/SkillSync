package skillsync.model;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
/**
 * Represents a User in the SkillSync application.
 * Holds user profile information including technical skills and project involvement.
 */
public class User {
    private String userId;
    private String name;
    private String email;
    private String password;
    private Set<Skill> skills;
    private List<String> createdProjectIds;
    private List<String> joinedProjectIds;
    public User() {
        this.skills = new HashSet<>();
        this.createdProjectIds = new ArrayList<>();
        this.joinedProjectIds = new ArrayList<>();
    }
    public User(String userId, String name, String email, String password) {
        this();
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Set<Skill> getSkills() {
        return skills;
    }
    public void setSkills(Set<Skill> skills) {
        this.skills = skills;
    }
    public void addSkill(Skill skill) {
        if (skill != null) {
            this.skills.add(skill);
        }
    }
    public boolean removeSkill(Skill skill) {
        return this.skills.remove(skill);
    }
    public List<String> getCreatedProjectIds() {
        return createdProjectIds;
    }
    public void addCreatedProjectId(String projectId) {
        if (projectId != null && !this.createdProjectIds.contains(projectId)) {
            this.createdProjectIds.add(projectId);
        }
    }
    public List<String> getJoinedProjectIds() {
        return joinedProjectIds;
    }
    public void addJoinedProjectId(String projectId) {
        if (projectId != null && !this.joinedProjectIds.contains(projectId)) {
            this.joinedProjectIds.add(projectId);
        }
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(userId, user.userId) || Objects.equals(email, user.email);
    }
    @Override
    public int hashCode() {
        return Objects.hash(userId, email);
    }
    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", skillsCount=" + skills.size() +
                ", createdProjects=" + createdProjectIds.size() +
                ", joinedProjects=" + joinedProjectIds.size() +
                '}';
    }
}

