package skillsync.service;

import skillsync.model.Project;
import skillsync.model.ProjectMessage;

public class ProjectDiscussionService {

    public void addMessage(Project project, ProjectMessage message) {

        project.addDiscussion(message);

    }

    public void displayMessages(Project project) {

        System.out.println("\n========== Project Discussion ==========");

        if (project.getDiscussions().isEmpty()) {

            System.out.println("No messages yet.");
            return;

        }

        for (ProjectMessage message : project.getDiscussions()) {

            System.out.println(message.getSender() + " : " + message.getMessage());

        }

    }

}
