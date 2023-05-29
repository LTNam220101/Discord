export interface DialogEditUsernameProps {
  user: {
    username: string;
  };
  handleCloseModal: (isOpen: boolean) => void;
};

export interface DialogEditNameProps {
  user: {
    first_name: string;
    last_name: string;
  };
  handleCloseModal: (isOpen: boolean) => void;
}

export interface DialogChangePasswordProps {
  handleCloseModal: (isOpen: boolean) => void;
}