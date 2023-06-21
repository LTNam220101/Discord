export interface SidebarServerProps {
  handleIndexTab: (index: number) => void;
}

export interface Permission {
  name: string;
  description: string;
  value: boolean;
}

export interface User {
  name: string;
  avatarUrl: string;
  username: string;
  roles: string[];
}

export interface ContentSettingServerProps {
  index: number;
}

export interface Permission {
  name: string;
  value: boolean;
  description: string;
}

export interface Role {
  name: string;
  countMember: number;
  permissions: Permission[];
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface A11yProps {
  id: string;
  'aria-controls': string;
}