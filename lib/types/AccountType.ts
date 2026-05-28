export interface AccountType {
    avatar: string;
    id: string;
    phone: string;
    firstname: string | null;
    lastname: string | null;
    username: string | null;
    bio: string | null;
    image: string | null;
    birthday: string | null;
    lastSeen: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    channel: string | null;
}