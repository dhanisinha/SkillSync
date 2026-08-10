package skillsync.service;

import skillsync.model.Project;



import skillsync.model.ProjectResource;

public class ProjectResourceService {

    public void addResource(Project project, ProjectResource resource) {

        project.addResource(resource);

    }

    public void displayResources(Project project) {

        System.out.println("\n========== Shared Resources ==========");

        if (project.getResources().isEmpty()) {

            System.out.println("No resources uploaded.");
            return;

        }

        for (ProjectResource resource : project.getResources()) {

            System.out.println("--------------------------------");
            System.out.println("Title : " + resource.getTitle());
            System.out.println("Link  : " + resource.getLink());
            System.out.println("By    : " + resource.getUploadedBy());

        }

    }

}