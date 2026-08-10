package skillsync.service;

import skillsync.model.User;
import skillsync.model.Club;
import skillsync.model.Project;

import java.util.List;

public class SearchService {

    public void searchUsers(List<User> users, String keyword) {

        System.out.println("\n========== Search Results ==========");

        boolean found = false;

        for (User user : users) {

            if (user.getName().toLowerCase().contains(keyword.toLowerCase())) {

                System.out.println("ID    : " + user.getUserId());
                System.out.println("Name  : " + user.getName());
                System.out.println("Email : " + user.getEmail());
                System.out.println("------------------------------");

                found = true;
            }

        }

        if (!found) {

            System.out.println("No user found.");

        }

    }
    public void searchClubs(List<Club> clubs, String keyword) {

        System.out.println("\n========== Search Results ==========");

        boolean found = false;

        for (Club club : clubs) {

            if (club.getClubName().toLowerCase().contains(keyword.toLowerCase())
                    || club.getCompanyName().toLowerCase().contains(keyword.toLowerCase())) {

                System.out.println("Club ID   : " + club.getClubId());
                System.out.println("Club Name : " + club.getClubName());
                System.out.println("Company   : " + club.getCompanyName());
                System.out.println("Creator   : " + club.getCreator().getName());
                System.out.println("--------------------------------");

                found = true;
            }
        }

        if (!found) {
            System.out.println("No club found.");
        }
    }

    public void searchProjects(List<Project> projects, String keyword) {

        System.out.println("\n========== Search Results ==========");

        boolean found = false;

        for (Project project : projects) {

            if (project.getProjectName().toLowerCase().contains(keyword.toLowerCase())) {

                System.out.println("Project ID   : " + project.getProjectId());
                System.out.println("Project Name : " + project.getProjectName());
                System.out.println("Owner        : " + project.getOwner().getName());
                System.out.println("--------------------------------");

                found = true;
            }
        }

        if (!found) {
            System.out.println("No project found.");
        }
    }

}
