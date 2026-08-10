package skillsync.service;

import skillsync.model.Notification;

import java.util.ArrayList;
import java.util.List;

public class NotificationService {

    private List<Notification> notifications = new ArrayList<>();

    public void addNotification(String message) {

        notifications.add(new Notification(message));

    }

    public void displayNotifications() {

        System.out.println("\n========== Notifications ==========");

        if (notifications.isEmpty()) {

            System.out.println("No notifications.");

            return;

        }

        for (Notification notification : notifications) {

            System.out.println("• " + notification.getMessage());

        }

    }

}