
export const Routes = {
    // pages
    AppSystem: { path: "/admin/appsystem" },
    ManageUsers: {path: "/"},
    singleUserID:{path: "/employees/emp/:UserID"},
    EditLogData:{path: "/userlogs/singlelog/:_id/:UserID"}, ///:_id
    AddAppLog:{path: "/userlogs/AddAppLog/:UserID"},
    AddNewUser:{path: "/employees/create"},
    EditUserProfile:{path: "/employees/modifyUser/:UserID"},
    Signin: { path: "/sign-in" },
    AddApplication : {path: "/addApplication"},
    AddAccessApp :{ path: "/addAccessApp"},

    NotFound: { path: "/examples/404" }

};