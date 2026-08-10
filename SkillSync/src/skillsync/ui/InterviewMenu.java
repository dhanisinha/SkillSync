package skillsync.ui;

import skillsync.model.Club;
import skillsync.model.InterviewExperience;
import skillsync.model.User;
import skillsync.service.InterviewService;

import java.util.Scanner;

public class InterviewMenu {

    private Scanner sc = new Scanner(System.in);
    private InterviewService interviewService = new InterviewService();

    public void show(Club club, User user) {

        while (true) {

            System.out.println("\n========== Interview Experiences ==========");
            System.out.println("1. Add Experience");
            System.out.println("2. View Experiences");
            System.out.println("3. Back");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    addExperience(club, user);
                    break;

                case 2:
                    interviewService.displayExperiences(club);
                    break;

                case 3:
                    return;

                default:
                    System.out.println("Invalid Choice.");
            }
        }
    }

    private void addExperience(Club club, User user) {

        System.out.println("Enter your interview experience:");
        String experience = sc.nextLine();

        InterviewExperience interviewExperience =
                new InterviewExperience(user.getName(), experience);

        interviewService.addExperience(club, interviewExperience);

        System.out.println("\nInterview Experience Added Successfully!");
    }
}
