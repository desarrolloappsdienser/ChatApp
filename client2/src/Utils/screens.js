//Estas son todas las paginas
//Esto sirve para no tener que estar escribiendo cuando queremos navegar entre ellas

const auth = {
    authStartScreen:"AuthStartScreen",
    loginScreen: "LoginScreen",
    registerScreen: "RegisterScreen"
};
const global = {
    userProfileScreen: "UserProfileScreen",
    cameraScreen: "CameraScreen",
    imageFullScreen: "ImageFullScreen",
    chatScreen: "ChatScreen",
    groupScreen: "GroupScreen",
    groupProfileScreen: "GroupProfileScreen",
    addUserGroupScreen: "AddUserGroupScreen",
    changeNameGroupScreen: "ChangeNameGroupScreen",
    
};
const chats = {
    root: "ChatsRoot",
    chatsScreen: "ChatsScreen",
    createChatScreen: "CreateChatScreen"
};
const groups = {
    root:"GroupsRoot",
    groupsScreen: "GroupsScreen",
    createGroupScreen: "CreateGroupScreen"
};
const settings = {
    root: "SettingsRoot",
    settingScreen: "SettingsScreen",
    changeFirstNameScreen: "ChangeFirstNameScreen",
    changeLastNameScreen: "ChangeLastNameScreen",

};



export const screens = {
    auth,
    global,
    tab:{
        root:"BottomTabRoot",
        chats,
        groups,
        settings,
    },

}