// Initialize an empty posts array (in-memory "database")
let posts = [];

// Function to display posts and comments
function displayPosts() {
    const postsList = document.getElementById("posts-list");
    postsList.innerHTML = ""; // Clear previous posts

    // Loop through the posts and display them
    posts.forEach((post, index) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = ` 
        <p><strong><img src="https://beebom.com/wp-content/uploads/2023/04/featured-new.jpg?w=730&h=487&crop=1&quality=75 "width="30"height="30">${post.anonymous}</strong></p>
            <p>${post.text}</p>
            <p>Likes: <span id="likes-${index}">${post.likes}</span></p>
            <button onclick="likePost(${index})">Like</button>
            
            <!-- Comment form -->
            <div>
                <input type="text" id="comment-${index}" placeholder="Leave a comment">
                <button onclick="addComment(${index})">Comment</button>
            </div>
            
            <!-- Display comments -->
            <div id="comments-${index}"></div>
        `;
        postsList.appendChild(postDiv);
        
        // Display comments for this post
        displayComments(index);
    });
}

// Function to add a new post
function addPost(text, anonymous) {
   const currentDate = new Date();
   const datetime = currentDate.toLocaleString();
    const newPost = {
        text,
        anonymous,
        datetime, 
        likes: 0,
        comments: [],
        image: "https://beebom.com/wp-content/uploads/2023/04/featured-new.jpg?w=730&h=487&crop=1&quality=75"
    
    };
    posts.push(newPost);
    displayPosts();
}

// Function to handle the "Post" button click
document.getElementById("post-button").addEventListener("click", () => {
    const postText = document.getElementById("post-text").value;
    const anonymousName = "Anonymous"; // You can customize this
    if (postText.trim() !== "") {
        addPost(postText, anonymousName);
        document.getElementById("post-text").value = ""; // Clear the textarea
    }
});

// Function to handle post likes
function likePost(index) {
    posts[index].likes++;
    displayPosts();
}

// Function to add a comment to a post
function addComment(postIndex) {
    const commentText = document.getElementById(`comment-${postIndex}`).value;
    if (commentText.trim() !== "") {
        posts[postIndex].comments.push(commentText);
        displayComments(postIndex); // Update the displayed comments
        document.getElementById(`comment-${postIndex}`).value = ""; // Clear the comment input
    }
}

// Function to display comments for a post
function displayComments(postIndex) {
    const commentsDiv = document.getElementById(`comments-${postIndex}`);
    commentsDiv.innerHTML = "";
    // Clear previous comments

    // Loop through comments and display them
    posts[postIndex].comments.forEach((comment) => {
        const commentP = document.createElement("p");
        commentP.textContent = comment;
        commentsDiv.appendChild(commentP);
    });
}

// Simulated JSON data as an alternate database (you can replace this with actual data)
const alternateDatabase = [
    {
        "text": "Hello, world!",
        "anonymous": "User1",
        "likes": 0,
        "comments": ["Comment 1", "Comment 2"],
        "image": "https://static.wikia.nocookie.net/jujutsu-kaisen/images/5/5a/Satoru_Gojo_arrives_on_the_battlefield_%28Anime%29.png/revision/latest?cb=20210226205256"
    },
    {
        "text": "Another post here.",
        "anonymous": "User2",
        "likes": 0,
        "comments": ["Comment 3", "Comment 4"],
        "image": "https://static.wikia.nocookie.net/jujutsu-kaisen/images/5/5a/Satoru_Gojo_arrives_on_the_battlefield_%28Anime%29.png/revision/latest?cb=20210226205256"
    }
];

// Load the initial data
// Initial display
posts = alternateDatabase;
displayPosts();


