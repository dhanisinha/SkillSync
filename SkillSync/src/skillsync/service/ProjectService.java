package skillsync.service;

import skillsync.model.Project;
import skillsync.model.User;

import java.util.ArrayList;
import java.util.List;

public class ProjectService {

    private List<Project> projects;
    private int nextProjectId;

    public ProjectService() {
        projects = new ArrayList<>();
        nextProjectId = 1;
    }

    public int generateProjectId() {
        return nextProjectId++;
    }

    public void createProject(Project project) {
        projects.add(project);
    }
    public boolean projectExists(String projectName) {

        for (Project project : projects) {

            if (project.getProjectName().equalsIgnoreCase(projectName)) {
                return true;
            }

        }

        return false;

    }
    public List<Project> getAllProjects() {

        return projects;

    }

    public Project findProjectById(int projectId) {

        for (Project project : projects) {

            if (project.getProjectId() == projectId) {
                return project;
            }

        }

        return null;
    }

    public boolean joinProject(User user, Project project) {

        if (project.hasMember(user)) {
            return false;
        }

        project.addMember(user);
        return true;
    }

    public List<Project> getExploreProjects(User user) {

        List<Project> exploreProjects = new ArrayList<>();

        for (Project project : projects) {

            if (!project.hasMember(user)) {
                exploreProjects.add(project);
            }

        }

        return exploreProjects;
    }

    public void displayExploreProjects(User user) {

        System.out.println("\n========== Explore Projects ==========");

        List<Project> exploreProjects = getExploreProjects(user);

        if (exploreProjects.isEmpty()) {
            System.out.println("No projects available to join.");
            return;
        }  

        for (Project project : exploreProjects) {

            System.out.println("Project ID   : " + project.getProjectId());
            System.out.println("Project Name : " + project.getProjectName());
            System.out.println("Owner        : " + project.getOwner().getName());
            System.out.println("Members      : " + project.getMembers().size());
            System.out.println("--------------------------------");

        }

    }

    public void displayMyProjects(User user) {

        System.out.println("\n========== My Projects ==========");

        boolean found = false;

        for (Project project : projects) {

            if (project.hasMember(user)) {

                System.out.println("Project ID   : " + project.getProjectId());
                System.out.println("Project Name : " + project.getProjectName());
                System.out.println("Owner        : " + project.getOwner().getName());
                System.out.println("Description : " + project.getDescription());
                System.out.println("Members     : " + project.getMembers().size());
                System.out.println("Tasks       : " + project.getTasks().size());
                System.out.println("--------------------------------");

                found = true;

            }

        }

        if (!found) {
            System.out.println("You haven't joined any projects.");
        }

    }

    public void displayProjectMembers(Project project) {

        System.out.println("\n===== Project Members =====");

        for (User user : project.getMembers()) {

            System.out.println("- " + user.getName());

        }

    }
}