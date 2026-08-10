package skillsync.service;

import skillsync.model.Club;
import skillsync.model.InterviewExperience;

public class InterviewService {

    public void addExperience(Club club, InterviewExperience experience) {

        club.addInterviewExperience(experience);

    }

    public void displayExperiences(Club club) {

        System.out.println("\n========== Interview Experiences ==========");

        if (club.getInterviewExperiences().isEmpty()) {

            System.out.println("No interview experiences yet.");
            return;

        }

        for (InterviewExperience experience : club.getInterviewExperiences()) {

            System.out.println("--------------------------------");
            System.out.println("By : " + experience.getAuthor());
            System.out.println();
            System.out.println(experience.getExperience());

        }

    }

}
