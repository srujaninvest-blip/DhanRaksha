import React from "react";
import { AuthScreen } from "./AuthScreen";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  return (
    <AuthScreen isModal={true} onClose={onClose} onSuccess={onSuccess} />
  );
};
