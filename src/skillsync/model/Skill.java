package skillsync.model;
import java.util.Objects;
/**
 * Represents a technical Skill in the SkillSync application.
 * Defines attributes associated with skills possessed by users or required by projects.
 */
public class Skill {
    private String skillId;
    private String name;
    private String category;
    public Skill() {
    }
    public Skill(String skillId, String name, String category) {
        this.skillId = skillId;
        this.name = name;
        this.category = category;
    }
    public String getSkillId() {
        return skillId;
    }
    public void setSkillId(String skillId) {
        this.skillId = skillId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Skill skill = (Skill) o;
        return Objects.equals(skillId, skill.skillId) || 
               (name != null && name.equalsIgnoreCase(skill.name));
    }
    @Override
    public int hashCode() {
        return Objects.hash(name != null ? name.toLowerCase() : null);
    }
    @Override
    public String toString() {
        return "Skill{" +
                "skillId='" + skillId + '\'' +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
