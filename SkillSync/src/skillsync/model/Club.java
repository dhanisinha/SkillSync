package skillsync.model;

import java.util.ArrayList;
import java.util.List;

public class Club {

    private int clubId;
    private String clubName;
    private String companyName;
    private String description;

    // User who created the club
    private User creator;

    // Members of the club
    private List<User> members;
    private List<DiscussionPost> discussionPosts;
    private List<Resource> resources;
    private List<InterviewExperience> interviewExperiences;

    public Club(int clubId,
                String clubName,
                String companyName,
                String description,
                User creator) {

        this.clubId = clubId;
        this.clubName = clubName;
        this.companyName = companyName;
        this.description = description;
        this.creator = creator;

        members = new ArrayList<>();
        discussionPosts = new ArrayList<>();
        resources = new ArrayList<>();
        interviewExperiences = new ArrayList<>();
    }

    public int getClubId() {
        return clubId;
    }

    public String getClubName() {
        return clubName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getDescription() {
        return description;
    }

    public User getCreator() {
        return creator;
    }

    public List<User> getMembers() {
        return members;
    }

    public void addMember(User user) {
        members.add(user);
    }

    public boolean hasMember(User user) {
        return members.contains(user);
    }
    public List<DiscussionPost> getDiscussionPosts() {
        return discussionPosts;
    }

    public List<Resource> getResources() {
        return resources;
    }

    public List<InterviewExperience> getInterviewExperiences() {
        return interviewExperiences;
    }

    public void addDiscussionPost(DiscussionPost post) {
        discussionPosts.add(post);
    }

    public void addResource(Resource resource) {
        resources.add(resource);
    }

    public void addInterviewExperience(InterviewExperience experience) {
        interviewExperiences.add(experience);
    }
}