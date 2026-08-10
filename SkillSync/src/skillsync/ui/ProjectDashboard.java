package skillsync.ui;

import skillsync.model.Project;
import skillsync.model.User;

import java.util.Scanner;

public class ProjectDashboard {

    private Scanner sc = new Scanner(System.in);

    public void show(Project project, User user) {

        while (true) {

            System.out.println("\n========== " + project.getProjectName().toUpperCase() + " ==========");
            System.out.println("Owner : " + project.getOwner().getName());
            System.out.println("Members : " + project.getMembers().size());
            System.out.println("--------------------------------");
            System.out.println("1. View Members");
            System.out.println("2. Project Discussion");
            System.out.println("3. Shared Resources");
            System.out.println("4. Tasks");
            System.out.println("5. Back");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:

                    System.out.println("\n===== Members =====");

                    for (User member : project.getMembers()) {
                        System.out.println("- " + member.getName());
                    }

                    break;

                case 2:

                    ProjectDiscussionMenu discussionMenu =
                            new ProjectDiscussionMenu();

                    discussionMenu.show(project, user);

                    break;

                case 3:

                    ProjectResourceMenu resourceMenu =
                            new ProjectResourceMenu();

                    resourceMenu.show(project, user);

                    break;

                case 4:

                    TaskMenu taskMenu = new TaskMenu();
                    taskMenu.show(project, user);

                    break;

                case 5:

                    return;

                default:

                    System.out.println("Invalid Choice.");

            }

        }

    }

}