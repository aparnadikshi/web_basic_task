type UserRole = "admin" | "editor" | "viewer";

function checkAccess(role: UserRole) {
    if (role === "admin") console.log("Full access");
    else if (role === "editor") console.log("Edit access");
    else console.log("View only");
}

checkAccess("editor");