package skillsync.ui;

import skillsync.model.Project;
import skillsync.model.User;
import skillsync.service.ProjectService;

import java.util.Scanner;

public class ProjectMenu {

    private Scanner sc = new Scanner(System.in);
    private ProjectService projectService;

    public ProjectMenu(ProjectService projectService) {
        this.projectService = projectService;
    }

    public void show(User user) {

        while (true) {

            System.out.println("\n========== Projects ==========");
            System.out.println("1. Create Project");
            System.out.println("2. Explore Projects");
            System.out.println("3. My Projects");
            System.out.println("4. Open Project");
            System.out.println("5. Back");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    createProject(user);
                    break;

                case 2:
                    exploreProjects(user);
                    break;

                case 3:
                    projectService.displayMyProjects(user);
                    break;

                case 4:
                    openProject(user);
                    break;

                case 5:
                    return;

                default:
                    System.out.println("Invalid Choice.");
            }
        }
    }

    private void createProject(User user) {

        String projectName;

        do {

            System.out.print("Enter Project Name: ");
            projectName = sc.nextLine().trim();

            if (projectName.isEmpty()) {

                System.out.println("Project name cannot be empty.");

            }

        } while (projectName.isEmpty());

        System.out.print("Enter Description: ");
        String description = sc.nextLine();

        if (projectService.projectExists(projectName)) {

            System.out.println("\nProject already exists.");
            return;

        }

        Project project = new Project(
                projectService.generateProjectId(),
                projectName,
                description,
                user
        );

        project.addMember(user);

        projectService.createProject(project);

        System.out.println("\nProject Created Successfully!");
    }

    private void exploreProjects(User user) {

        projectService.displayExploreProjects(user);

        if (projectService.getExploreProjects(user).isEmpty()) {
            return;
        }

        System.out.print("\nEnter Project ID to Join (0 to go back): ");
        int id = sc.nextInt();
        sc.nextLine();

        if (id == 0) {
            return;
        }

        Project project = projectService.findProjectById(id);

        if (project == null) {
            System.out.println("Project not found.");
            return;
        }

        if (projectService.joinProject(user, project)) {
            System.out.println("\nSuccessfully joined " + project.getProjectName());
        } else {
            System.out.println("\nAlready joined.");
        }
    }

    private void openProject(User user) {

        projectService.displayMyProjects(user);

        System.out.print("\nEnter Project ID: ");
        int id = sc.nextInt();
        sc.nextLine();

        Project project = projectService.findProjectById(id);

        if (project == null) {
            System.out.println("Project not found.");
            return;
        }

        if (!project.hasMember(user)) {
            System.out.println("You are not a member of this project.");
            return;
        }

        ProjectDashboard dashboard = new ProjectDashboard();
        dashboard.show(project, user);

    }
}