package skillsync.ui;

import skillsync.model.Project;
import skillsync.model.ProjectMessage;
import skillsync.model.User;
import skillsync.service.ProjectDiscussionService;

import java.util.Scanner;

public class ProjectDiscussionMenu {

    private Scanner sc = new Scanner(System.in);
    private ProjectDiscussionService discussionService = new ProjectDiscussionService();

    public void show(Project project, User user) {

        while (true) {

            System.out.println("\n========== Project Discussion ==========");
            System.out.println("1. Add Message");
            System.out.println("2. View Messages");
            System.out.println("3. Back");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:

                    System.out.print("Enter Message: ");
                    String text = sc.nextLine();

                    ProjectMessage message =
                            new ProjectMessage(user.getName(), text);

                    discussionService.addMessage(project, message);

                    System.out.println("Message Posted!");

                    break;

                case 2:

                    discussionService.displayMessages(project);

                    break;

                case 3:

                    return;

                default:

                    System.out.println("Invalid Choice.");

            }

        }

    }

}
