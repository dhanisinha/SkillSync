package skillsync.ui;

import skillsync.model.Club;
import skillsync.model.Resource;
import skillsync.model.User;
import skillsync.service.ResourceService;

import java.util.Scanner;

public class ResourceMenu {

    private Scanner sc = new Scanner(System.in);
    private ResourceService resourceService = new ResourceService();

    public void show(Club club, User user) {

        while (true) {

            System.out.println("\n========== Resources ==========");
            System.out.println("1. Add Resource");
            System.out.println("2. View Resources");
            System.out.println("3. Back");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    addResource(club, user);
                    break;

                case 2:
                    resourceService.displayResources(club);
                    break;

                case 3:
                    return;

                default:
                    System.out.println("Invalid Choice.");
            }
        }
    }

    private void addResource(Club club, User user) {

        System.out.print("Enter Resource Title: ");
        String title = sc.nextLine();

        System.out.print("Enter Resource Link: ");
        String link = sc.nextLine();

        Resource resource = new Resource(
                title,
                link,
                user.getName()
        );

        resourceService.addResource(club, resource);

        System.out.println("\nResource Added Successfully!");
    }
}
