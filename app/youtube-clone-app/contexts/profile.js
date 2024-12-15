import { createContext } from "react";
const ProfileContext = createContext({
  profile: { user: {}, following: {}, followers: {} },
  setProfile: () => {},
});

export default ProfileContext;
