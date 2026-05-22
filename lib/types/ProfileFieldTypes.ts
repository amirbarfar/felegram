export type FieldKey = "name" | "phone" | "username" | "channel" | "birthday";

export const fieldKeyToFa: Record<FieldKey, string> = {
    name: "نام و نام خانوادگی",
    phone: "شماره تلفن",
    username: "نام کاربری",
    channel: "کانال عمومی",
    birthday: "تاریخ تولد",
};

export const faToFieldKey: Partial<Record<string, FieldKey>> = {
    "نام": "name",
    "شماره تلفن": "phone",
    "نام کاربری": "username",
    "کانال عمومی": "channel",
    "تاریخ تولد": "birthday",
};
