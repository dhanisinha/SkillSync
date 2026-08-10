package skillsync.ui;

import skillsync.model.Club;
import skillsync.model.User;

import java.util.Scanner;

public class ClubDashboard {

    private Scanner sc = new Scanner(System.in);

    public void show(Club club, User user) {

        while (true) {

            System.out.println("\n========== " + club.getClubName().toUpperCase() + " ==========");
            System.out.println("Company : " + club.getCompanyName());
            System.out.println("Creator : " + club.getCreator().getName());
            System.out.println("Members : " + club.getMembers().size());

            System.out.println("--------------------------------");
            System.out.println("1. View Members");
            System.out.println("2. Discussion Board");
            System.out.println("3. Resources");
            System.out.println("4. Interview Experiences");
            System.out.println("5. Back");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    viewMembers(club);
                    break;

                case 2:
                    DiscussionMenu discussionMenu = new DiscussionMenu();
                    discussionMenu.show(club, user);
                    break;

                case 3:

                    ResourceMenu resourceMenu = new ResourceMenu();
                    resourceMenu.show(club, user);

                    break;

                case 4:

                    InterviewMenu interviewMenu = new InterviewMenu();
                    interviewMenu.show(club, user);

                    break;

                case 5:
                    return;

                default:
                    System.out.println("Invalid Choice.");
            }
        }
    }

    private void viewMembers(Club club) {

        System.out.println("\n===== Members =====");

        if (club.getMembers().isEmpty()) {
            System.out.println("No members.");
            return;
        }

        for (User member : club.getMembers()) {
            System.out.println("- " + member.getName());
        }
    }
}
