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