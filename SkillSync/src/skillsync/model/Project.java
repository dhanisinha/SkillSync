package skillsync.model;

import java.util.ArrayList;
import java.util.List;



public class Project {

    private int projectId;
    private String projectName;
    private String description;

    private User owner;

    private List<User> members;
    private List<ProjectMessage> discussions;
    private List<ProjectResource> resources;
    private List<Task> tasks;


    public Project(int projectId,
                   String projectName,
                   String description,
                   User owner) {

        this.projectId = projectId;
        this.projectName = projectName;
        this.description = description;
        this.owner = owner;

        members = new ArrayList<>();
        discussions = new ArrayList<>();
        resources = new ArrayList<>();
        tasks = new ArrayList<>();

    }

    public int getProjectId() {
        return projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getDescription() {
        return description;
    }

    public User getOwner() {
        return owner;
    }

    public List<User> getMembers() {
        return members;
    }

    public void addMember(User user) {
        members.add(user);
    }

    public boolean hasMember(User user) {
        return members.contains(user);
    }
    public void addDiscussion(ProjectMessage message) {

        discussions.add(message);

    }

    public List<ProjectMessage> getDiscussions() {

        return discussions;

    }
    public void addResource(ProjectResource resource) {

        resources.add(resource);

    }

    public List<ProjectResource> getResources() {

        return resources;

    }
    public void addTask(Task task) {

        tasks.add(task);

    }

    public List<Task> getTasks() {

        return tasks;

    }


}