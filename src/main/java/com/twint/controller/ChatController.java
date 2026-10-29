
package com.twint.controller;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.twint.model.ChatMessage;

@Controller
public class ChatController {

    private final Set<String> participants = new HashSet<>();

    @MessageMapping("/chat.join")
    @SendTo("/topic/messages")
    public synchronized ChatMessage join(ChatMessage message) {
        String sender = clean(message.getSender());

        if (sender.isBlank() || sender.length() > 20) {
            return systemMessage("ERROR", "Username must be 1–20 characters.");
        }

        if (participants.contains(sender)) {
            return systemMessage("ERROR", "Username already in use.");
        }

        if (participants.size() >= 2) {
            return systemMessage("ERROR", "Chat is full. Only two users allowed.");
        }

        participants.add(sender);

        return systemMessage("JOIN", sender + " joined the chat.");
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public synchronized ChatMessage send(ChatMessage message) {
        String sender = clean(message.getSender());
        String content = clean(message.getContent());

        if (!participants.contains(sender)
                || content.isBlank()
                || content.length() > 1000) {
            return systemMessage("ERROR", "Invalid message or sender.");
        }

        return new ChatMessage(
                sender, content, "CHAT", Instant.now().toString());
    }

    @MessageMapping("/chat.leave")
    @SendTo("/topic/messages")
    public synchronized ChatMessage leave(ChatMessage message) {
        String sender = clean(message.getSender());

        if (participants.remove(sender)) {
            return systemMessage("LEAVE", sender + " left the chat.");
        }

        return null;
    }

    private ChatMessage systemMessage(String type, String content) {
        return new ChatMessage(
                "TwinT", content, type, Instant.now().toString());
    }

    private String clean(String value) {
        return value == null ? "" : value.trim();
    }
}
