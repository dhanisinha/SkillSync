package skillsync.service;

import skillsync.model.Club;
import skillsync.model.Resource;

public class ResourceService {

    public void addResource(Club club, Resource resource) {

        club.addResource(resource);

    }

    public void displayResources(Club club) {

        System.out.println("\n========== Resources ==========");

        if (club.getResources().isEmpty()) {

            System.out.println("No resources available.");
            return;

        }

        for (Resource resource : club.getResources()) {

            System.out.println("--------------------------------");
            System.out.println("Title : " + resource.getTitle());
            System.out.println("Link  : " + resource.getLink());
            System.out.println("By    : " + resource.getUploadedBy());

        }

    }

}
