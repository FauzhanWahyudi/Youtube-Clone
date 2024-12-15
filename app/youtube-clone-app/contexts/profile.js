import { createContext } from "react";
const ProfileContext = createContext({
  profile: false,
  setProfile: () => {},
});

export default ProfileContext;
