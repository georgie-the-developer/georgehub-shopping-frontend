"use client"; // Needed in Next.js App Router for stateful components
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";

interface ProfileUpdateContextType {
  changes: {};
  setChanges: React.Dispatch<SetStateAction<object>>;
  isEdited: boolean;
}
const ProfileUpdateContext = createContext<
  ProfileUpdateContextType | undefined
>(undefined);

export const ProfileUpdateProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [changes, setChanges] = useState<{ [key: string]: any }>({});
  const [isEdited, setIsEdited] = useState<boolean>(false);
  useEffect(() => {
    if (Object.keys(changes).length !== 0) {
      setIsEdited(true);
      console.log(changes);
    } else {
      setIsEdited(false);
    }
  }, [changes]);
  return (
    <ProfileUpdateContext.Provider value={{ changes, setChanges, isEdited }}>
      {children}
    </ProfileUpdateContext.Provider>
  );
};
export const useProfileUpdate = () => {
  const context = useContext(ProfileUpdateContext);
  if (!context) {
    throw new Error(
      "useProfileUpdate must be used within a ProfileUpdateProvider"
    );
  }
  return context;
};
