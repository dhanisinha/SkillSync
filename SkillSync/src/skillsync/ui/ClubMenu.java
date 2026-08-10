package skillsync.ui;

import skillsync.model.Club;
import skillsync.ui.ClubDashboard;
import skillsync.model.User;
import skillsync.service.ClubService;

import java.util.Scanner;

public class ClubMenu {

    private Scanner sc = new Scanner(System.in);
    private ClubService clubService;

    public ClubMenu(ClubService clubService) {
        this.clubService = clubService;
    }

    public void show(User user) {

        while (true) {

            System.out.println("\n========== Company Clubs ==========");
            System.out.println("1. Create Club");
            System.out.println("2. Explore Clubs");
            System.out.println("3. My Clubs");
            System.out.println("4. Open Club");
            System.out.println("5. Back");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    createClub(user);
                    break;

                case 2:
                    exploreClubs(user);
                    break;

                case 3:
                    clubService.displayUserClubs(user);
                    break;

                case 4:
                    openClub(user);
                    break;

                case 5:
                    return;

                default:
                    System.out.println("Invalid Choice.");
            }
        }
    }

    private void createClub(User user) {


        String clubName;

        do {

            System.out.print("Enter Club Name: ");
            clubName = sc.nextLine().trim();

            if (clubName.isEmpty()) {
                System.out.println("Club name cannot be empty.");
            }

        } while (clubName.isEmpty());

        System.out.print("Enter Company Name: ");
        String companyName = sc.nextLine();

        System.out.print("Enter Description: ");
        String description = sc.nextLine();

        if (clubService.clubExists(clubName)) {

            System.out.println("\nClub already exists.");
            return;

        }
        Club club = new Club(
                clubService.generateClubId(),
                clubName,
                companyName,
                description,
                user
        );

        // Creator automatically becomes the first member
        club.addMember(user);

        clubService.createClub(club);

        System.out.println("\nClub Created Successfully!");
        System.out.println("You are now the first member of this club.");
    }

    private void joinClub(User user) {

        clubService.displayAllClubs();

        System.out.print("\nEnter Club ID to Join: ");
        int clubId = sc.nextInt();
        sc.nextLine();

        Club club = clubService.findClubById(clubId);

        if (club == null) {
            System.out.println("Club not found.");
            return;
        }

        boolean joined = clubService.joinClub(user, club);

        if (joined) {

            System.out.println("Successfully joined " + club.getClubName() + "!");

        }
        else {

            System.out.println("You are already a member of this club.");

        }
    }

    private void viewMembers() {

        clubService.displayAllClubs();

        System.out.print("\nEnter Club ID: ");
        int clubId = sc.nextInt();
        sc.nextLine();

        Club club = clubService.findClubById(clubId);

        if (club == null) {
            System.out.println("Club not found.");
            return;
        }

        clubService.displayClubMembers(club);
    }
    private void exploreClubs(User user) {

        clubService.displayExploreClubs(user);

        if (clubService.getExploreClubs(user).isEmpty()) {
            return;
        }

        System.out.print("\nEnter Club ID to Join (0 to go back): ");
        int clubId = sc.nextInt();
        sc.nextLine();

        if (clubId == 0) {
            return;
        }

        Club club = clubService.findClubById(clubId);

        if (club == null) {
            System.out.println("Club not found.");
            return;
        }

        if (clubService.joinClub(user, club)) {
            System.out.println("\nSuccessfully joined " + club.getClubName() + "!");
        } else {
            System.out.println("\nYou are already a member of this club.");
        }
    }
    private void openClub(User user) {

        clubService.displayUserClubs(user);

        System.out.print("\nEnter Club ID: ");
        int clubId = sc.nextInt();
        sc.nextLine();

        Club club = clubService.findClubById(clubId);

        if (club == null) {
            System.out.println("Club not found.");
            return;
        }

        if (!club.hasMember(user)) {
            System.out.println("You are not a member of this club.");
            return;
        }

        ClubDashboard dashboard = new ClubDashboard();
        dashboard.show(club, user);
    }
}