package skillsync.ui;

import skillsync.model.Skill;
import skillsync.model.User;
import skillsync.service.ClubService;
import skillsync.service.ProjectService;
import skillsync.service.SearchService;
import skillsync.service.UserService;

import java.util.Scanner;

public class DashboardMenu {

    private Scanner sc = new Scanner(System.in);

    private ClubService clubService;
    private ProjectService projectService;
    private UserService userService;
    private SearchService searchService;

    public DashboardMenu(UserService userService,
                         ClubService clubService,
                         ProjectService projectService) {

        this.userService = userService;
        this.clubService = clubService;
        this.projectService = projectService;
        this.searchService = new SearchService();

    }

    public void show(User user) {

        while (true) {

            System.out.println("\n========== Dashboard ==========");
            System.out.println("Welcome, " + user.getName());
            System.out.println("-------------------------------");
            System.out.println("1. View Profile");
            System.out.println("2. Add Skill");
            System.out.println("3. View My Skills");
            System.out.println("4. Become Mentor");
            System.out.println("5. Company Clubs");
            System.out.println("6. Projects");
            System.out.println("7. Search");
            System.out.println("8. Logout");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    viewProfile(user);
                    break;

                case 2:
                    addSkill(user);
                    break;

                case 3:
                    viewSkills(user);
                    break;

                case 4:
                    becomeMentor(user);
                    break;

                case 5:
                    ClubMenu clubMenu = new ClubMenu(clubService);
                    clubMenu.show(user);
                    break;

                case 6:
                    ProjectMenu projectMenu = new ProjectMenu(projectService);
                    projectMenu.show(user);
                    break;

                case 7:
                    SearchMenu searchMenu = new SearchMenu(
                            searchService,
                            userService,
                            clubService,
                            projectService
                    );

                    searchMenu.show();
                    break;

                case 8:
                    return;

                default:
                    System.out.println("Invalid Choice.");
            }
        }
    }

    private void viewProfile(User user) {

        System.out.println("\n===== My Profile =====");
        System.out.println("ID    : " + user.getUserId());
        System.out.println("Name  : " + user.getName());
        System.out.println("Email : " + user.getEmail());

    }

    private void addSkill(User user) {

        System.out.print("Enter Skill Name: ");
        String skillName = sc.nextLine();

        Skill skill = new Skill(skillName);

        user.addSkill(skill);

        System.out.println("Skill Added Successfully!");

    }

    private void viewSkills(User user) {

        System.out.println("\n===== My Skills =====");

        if (user.getSkills().isEmpty()) {

            System.out.println("No skills added yet.");
            return;

        }

        for (Skill skill : user.getSkills()) {

            System.out.println("- " + skill.getSkillName());

        }

    }

    private void becomeMentor(User user) {

        if (user.isMentor()) {

            System.out.println("You are already a mentor.");
            return;

        }

        if (user.getSkills().isEmpty()) {

            System.out.println("Add at least one skill before becoming a mentor.");
            return;

        }

        user.becomeMentor();

        System.out.println("Congratulations!");
        System.out.println("You are now a mentor on SkillSync.");

    }
}