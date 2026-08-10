package skillsync.model;
import java.util.ArrayList;
import java.util.List;

public class User {

    private int userId;
    private String name;
    private String email;
    private String password;
    private List<Skill> skills;
    private boolean mentor;

    public User(int userId, String name, String email, String password) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.skills = new ArrayList<>();
        this.mentor = false;
    }
    public int getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
    public void addSkill(Skill skill){
        skills.add(skill);
    }
    public List<Skill> getSkills(){
        return skills;
    }
    public boolean isMentor() {
        return mentor;
    }

    public void becomeMentor() {
        mentor = true;
    }
}
