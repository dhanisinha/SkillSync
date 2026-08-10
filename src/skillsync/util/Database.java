package skillsync.util;
import skillsync.model.Project;
import skillsync.model.Skill;
import skillsync.model.User;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
/**
 * In-memory database storing collections of users, projects, and skills.
 * Uses HashMaps for O(1) fast lookup operations.
 */
public class Database {
    private static Database instance;
    private final Map<String, User> userMap;
    private final Map<String, User> emailToUserMap;
    private final Map<String, Project> projectMap;
    private final Map<String, Skill> skillMap;
    public Database() {
        this.userMap = new HashMap<>();
        this.emailToUserMap = new HashMap<>();
        this.projectMap = new HashMap<>();
        this.skillMap = new HashMap<>();
    }
    public static synchronized Database getInstance() {
        if (instance == null) {
            instance = new Database();
        }
        return instance;
    }
    // User Operations
    public void saveUser(User user) {
        if (user != null && user.getUserId() != null) {
            userMap.put(user.getUserId(), user);
            if (user.getEmail() != null) {
                emailToUserMap.put(user.getEmail().toLowerCase(), user);
            }
        }
    }
    public User getUserById(String userId) {
        return userMap.get(userId);
    }
    public User getUserByEmail(String email) {
        if (email == null) return null;
        return emailToUserMap.get(email.toLowerCase());
    }
    public List<User> getAllUsers() {
        return new ArrayList<>(userMap.values());
    }
    // Project Operations
    public void saveProject(Project project) {
        if (project != null && project.getProjectId() != null) {
            projectMap.put(project.getProjectId(), project);
        }
    }
    public Project getProjectById(String projectId) {
        return projectMap.get(projectId);
    }
    public List<Project> getAllProjects() {
        return new ArrayList<>(projectMap.values());
    }
    // Skill Operations
    public void saveSkill(Skill skill) {
        if (skill != null && skill.getSkillId() != null) {
            skillMap.put(skill.getSkillId(), skill);
        }
    }
    public Skill getSkillById(String skillId) {
        return skillMap.get(skillId);
    }
    public List<Skill> getAllSkills() {
        return new ArrayList<>(skillMap.values());
    }
    public void clearAll() {
        userMap.clear();
        emailToUserMap.clear();
        projectMap.clear();
        skillMap.clear();
    }
}

