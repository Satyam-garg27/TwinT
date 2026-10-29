
const login = document.getElementById("login");
const chat = document.getElementById("chat");
const statusEl = document.getElementById("status");
const joinForm = document.getElementById("joinForm");
const usernameInput = document.getElementById("username");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messagesEl = document.getElementById("messages");
const leaveBtn = document.getElementById("leaveBtn");

let client = null;
let username = "";
let joined = false;
let joining = false;

function setStatus(text) {
    statusEl.textContent = text;
}

function addNotice(text) {
    const node = document.createElement("div");
    node.className = "notice";
    node.textContent = text;
    messagesEl.appendChild(node);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addMessage(message) {
    if (messagesEl.querySelector(".empty")) {
        messagesEl.innerHTML = "";
    }

    if (message.type === "ERROR") {
        addNotice(message.content);
        return;
    }

    if (message.type === "JOIN" || message.type === "LEAVE") {
        addNotice(message.content);
        return;
    }

    if (message.type !== "CHAT") return;

    const wrapper = document.createElement("div");
    wrapper.className = "message" +
        (message.sender === username ? " mine" : "");

    const sender = document.createElement("div");
    sender.className = "sender";
    sender.textContent = message.sender;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = message.content;

    const time = document.createElement("div");
    time.className = "time";
    const date = new Date(message.timestamp);
    time.textContent = Number.isNaN(date.getTime())
        ? ""
        : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    wrapper.append(sender, bubble, time);
    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

function disconnect(announceLeave = true) {
    if (client && client.connected) {
        if (announceLeave && joined) {
            client.publish({
                destination: "/app/chat.leave",
                body: JSON.stringify({ sender: username })
            });
        }
        client.deactivate();
    }

    client = null;
    joined = false;
    joining = false;
    login.classList.remove("hidden");
    chat.classList.add("hidden");
    setStatus("Offline");
}

joinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    username = usernameInput.value.trim();

    if (!username || username.length > 20) {
        alert("Choose a username between 1 and 20 characters.");
        return;
    }

    joining = true;
    setStatus("Connecting…");

    client = new StompJs.Client({
        brokerURL: `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/chat`,
        reconnectDelay: 0,

        onConnect: () => {
            client.subscribe("/topic/messages", (frame) => {
                const message = JSON.parse(frame.body);

                if (message.type === "ERROR" && joining) {
                    joining = false;
                    addNotice(message.content);
                    setStatus("Not joined");
                    client.deactivate();
                    client = null;
                    return;
                }

                addMessage(message);
            });

            client.publish({
                destination: "/app/chat.join",
                body: JSON.stringify({
                    sender: username,
                    content: "",
                    type: "JOIN"
                })
            });

            // The JOIN response arrives on the shared topic.
            // Enable chat after a short delay for this prototype.
            setTimeout(() => {
                if (!client || !client.connected || !joining) return;

                joining = false;
                joined = true;
                login.classList.add("hidden");
                chat.classList.remove("hidden");
                setStatus("Connected");
                messagesEl.innerHTML = "";
                messageInput.focus();
            }, 300);
        },

        onStompError: () => {
            setStatus("Connection error");
            alert("Could not connect to TwinT. Is the server running?");
        },

        onWebSocketError: () => {
            setStatus("Connection error");
        },

        onWebSocketClose: () => {
            if (joined) {
                joined = false;
                login.classList.remove("hidden");
                chat.classList.add("hidden");
                setStatus("Disconnected");
            }
        }
    });

    client.activate();
});

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const content = messageInput.value.trim();
    if (!content || !joined || !client?.connected) return;

    client.publish({
        destination: "/app/chat.send",
        body: JSON.stringify({
            sender: username,
            content: content,
            type: "CHAT"
        })
    });

    messageInput.value = "";
    messageInput.focus();
});

leaveBtn.addEventListener("click", () => disconnect(true));

window.addEventListener("beforeunload", () => {
    if (client?.connected && joined) {
        client.publish({
            destination: "/app/chat.leave",
            body: JSON.stringify({ sender: username })
        });
    }
});
