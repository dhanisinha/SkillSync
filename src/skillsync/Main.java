package skillsync;
import skillsync.model.Project;
import skillsync.model.Skill;
import skillsync.model.User;
import skillsync.util.Database;
/**
 * Main entry point for the SkillSync application.
 * SkillSync is a Skill-Based Collaboration Network where students can create profiles,
 * add technical skills, create projects, and find teammates based on shared skills.
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("================================");
        System.out.println("      Welcome to SkillSync      ");
        System.out.println(" A Skill-Based Collaboration App");
        System.out.println("================================");
        System.out.println();
        // Testing Domain Models & In-Memory Database
        Database db = Database.getInstance();
        // Create Skills
        Skill java = new Skill("SK-101", "Java", "Programming");
        Skill react = new Skill("SK-102", "React", "Frontend");
        Skill dataStructures = new Skill("SK-103", "Data Structures", "Computer Science");
        db.saveSkill(java);
        db.saveSkill(react);
        db.saveSkill(dataStructures);
        // Create User
        User user1 = new User("USR-001", "Alice Smith", "alice@example.com", "secure123");
        user1.addSkill(java);
        user1.addSkill(dataStructures);
        db.saveUser(user1);
        // Create Project
        Project project1 = new Project("PRJ-501", "SkillSync Network", "Skill-based collaboration app for students", user1.getUserId(), 4);
        project1.addRequiredSkill(java);
        project1.addRequiredSkill(react);
        db.saveProject(project1);
        user1.addCreatedProjectId(project1.getProjectId());
        // Display Database Summary
        System.out.println("--- Database Initialization Summary ---");
        System.out.println("Registered Skills  : " + db.getAllSkills().size() + " " + db.getAllSkills());
        System.out.println("Registered Users   : " + db.getAllUsers().size() + " " + db.getAllUsers());
        System.out.println("Created Projects   : " + db.getAllProjects().size() + " " + db.getAllProjects());
        System.out.println("----------------------------------------");
    }
}

