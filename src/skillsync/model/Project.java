package skillsync.model;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
/**
 * Represents a Project created by a user in the SkillSync application.
 * Contains project details, required skills, and assigned team members.
 */
public class Project {
    private String projectId;
    private String title;
    private String description;
    private String ownerId;
    private Set<Skill> requiredSkills;
    private List<String> teamMemberIds;
    private int maxTeamSize;
    private boolean isCompleted;
    public Project() {
        this.requiredSkills = new HashSet<>();
        this.teamMemberIds = new ArrayList<>();
        this.maxTeamSize = 5;
        this.isCompleted = false;
    }
    public Project(String projectId, String title, String description, String ownerId, int maxTeamSize) {
        this();
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.maxTeamSize = maxTeamSize;
        if (ownerId != null) {
            this.teamMemberIds.add(ownerId);
        }
    }
    public String getProjectId() {
        return projectId;
    }
    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getOwnerId() {
        return ownerId;
    }
    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }
    public Set<Skill> getRequiredSkills() {
        return requiredSkills;
    }
    public void setRequiredSkills(Set<Skill> requiredSkills) {
        this.requiredSkills = requiredSkills;
    }
    public void addRequiredSkill(Skill skill) {
        if (skill != null) {
            this.requiredSkills.add(skill);
        }
    }
    public List<String> getTeamMemberIds() {
        return teamMemberIds;
    }
    public boolean addTeamMember(String userId) {
        if (userId != null && !teamMemberIds.contains(userId) && teamMemberIds.size() < maxTeamSize) {
            teamMemberIds.add(userId);
            return true;
        }
        return false;
    }
    public boolean removeTeamMember(String userId) {
        return teamMemberIds.remove(userId);
    }
    public int getMaxTeamSize() {
        return maxTeamSize;
    }
    public void setMaxTeamSize(int maxTeamSize) {
        this.maxTeamSize = maxTeamSize;
    }
    public boolean isCompleted() {
        return isCompleted;
    }
    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return Objects.equals(projectId, project.projectId);
    }
    @Override
    public int hashCode() {
        return Objects.hash(projectId);
    }
    @Override
    public String toString() {
        return "Project{" +
                "projectId='" + projectId + '\'' +
                ", title='" + title + '\'' +
                ", ownerId='" + ownerId + '\'' +
                ", requiredSkills=" + requiredSkills.size() +
                ", members=" + teamMemberIds.size() + "/" + maxTeamSize +
                ", isCompleted=" + isCompleted +
                '}';
    }
}
