package skillsync.ui;

import skillsync.service.*;

import java.util.Scanner;

public class SearchMenu {

    private Scanner sc = new Scanner(System.in);

    private SearchService searchService;
    private UserService userService;
    private ClubService clubService;
    private ProjectService projectService;

    public SearchMenu(SearchService searchService,
                      UserService userService,
                      ClubService clubService,
                      ProjectService projectService) {

        this.searchService = searchService;
        this.userService = userService;
        this.clubService = clubService;
        this.projectService = projectService;

    }

    public void show() {

        while (true) {

            System.out.println("\n========== Search ==========");
            System.out.println("1. Search User");
            System.out.println("2. Search Club");
            System.out.println("3. Search Project");
            System.out.println("4. Back");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:

                    System.out.print("Enter User Name: ");
                    String userName = sc.nextLine();

                    searchService.searchUsers(
                            userService.getAllUsers(),
                            userName
                    );

                    break;

                case 2:

                    System.out.print("Enter Club Name: ");
                    String clubName = sc.nextLine();

                    searchService.searchClubs(
                            clubService.getAllClubs(),
                            clubName
                    );

                    break;

                case 3:

                    System.out.print("Enter Project Name: ");
                    String projectName = sc.nextLine();

                    searchService.searchProjects(
                            projectService.getAllProjects(),
                            projectName
                    );

                    break;

                case 4:

                    return;

                default:

                    System.out.println("Invalid Choice.");

            }

        }

    }

}