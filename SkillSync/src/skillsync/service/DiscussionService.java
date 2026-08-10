package skillsync.service;

import skillsync.model.Club;
import skillsync.model.DiscussionPost;

public class DiscussionService {

    public void addPost(Club club, DiscussionPost post) {

        club.addDiscussionPost(post);

    }

    public void displayPosts(Club club) {

        System.out.println("\n========== Discussion Board ==========");

        if (club.getDiscussionPosts().isEmpty()) {
            System.out.println("No discussions yet.");
            return;
        }

        for (DiscussionPost post : club.getDiscussionPosts()) {

            System.out.println("--------------------------------");
            System.out.println(post.getAuthor());
            System.out.println(post.getMessage());
        }
    }
}
