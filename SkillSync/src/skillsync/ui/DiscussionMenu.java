package skillsync.ui;

import skillsync.model.Club;
import skillsync.model.DiscussionPost;
import skillsync.model.User;
import skillsync.service.DiscussionService;

import java.util.Scanner;

public class DiscussionMenu {

    private Scanner sc = new Scanner(System.in);
    private DiscussionService discussionService = new DiscussionService();

    public void show(Club club, User user) {

        while (true) {

            System.out.println("\n========== Discussion Board ==========");
            System.out.println("1. Add Post");
            System.out.println("2. View Posts");
            System.out.println("3. Back");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    addPost(club, user);
                    break;

                case 2:
                    discussionService.displayPosts(club);
                    break;

                case 3:
                    return;

                default:
                    System.out.println("Invalid Choice.");
            }
        }
    }

    private void addPost(Club club, User user) {

        System.out.print("Enter your message: ");
        String message = sc.nextLine();

        DiscussionPost post =
                new DiscussionPost(user.getName(), message);

        discussionService.addPost(club, post);

        System.out.println("\nPost Added Successfully!");
    }
}
