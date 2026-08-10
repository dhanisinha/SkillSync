package skillsync.ui;

import skillsync.model.Project;
import skillsync.model.ProjectResource;
import skillsync.model.User;
import skillsync.service.ProjectResourceService;

import java.util.Scanner;

public class ProjectResourceMenu {

    private Scanner sc = new Scanner(System.in);

    private ProjectResourceService resourceService =
            new ProjectResourceService();

    public void show(Project project,
                     User user) {

        while (true) {

            System.out.println("\n========== Shared Resources ==========");
            System.out.println("1. Add Resource");
            System.out.println("2. View Resources");
            System.out.println("3. Back");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:

                    System.out.print("Title: ");
                    String title = sc.nextLine();

                    System.out.print("Link: ");
                    String link = sc.nextLine();

                    ProjectResource resource =
                            new ProjectResource(
                                    title,
                                    link,
                                    user.getName()
                            );

                    resourceService.addResource(project, resource);

                    System.out.println("Resource Added Successfully!");

                    break;

                case 2:

                    resourceService.displayResources(project);

                    break;

                case 3:

                    return;

                default:

                    System.out.println("Invalid Choice.");
            }
        }
    }
}