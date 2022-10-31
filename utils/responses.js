const responses = {
    invalidRequestBody: {
        status: "BAD_REQUEST",
        message: "Invalid request body"
    },
    internalServerError: {
        status: "Error",
        message: "Internal server error"
    },
    created: {
        status: "OK",
        message: "Prise posted successfully"
    },
    deleted: {
        status: "OK",
        message: "Record deleted succeessfully"
    },
    postNotFound: {
        status: "BAD_REQUEST",
        message: "Post not found"
    },
    postUpdated: {
        status: "OK",
        message: "Post updated successfully"
    },
    commentAdded: {
        status: "OK",
        message: "Comment added successfully"
    },
    commentNotFound: {
        status: "BAD_REQUEST",
        message: "Comment not found"
    }
};


export default responses;