interface UserB {
  id: number;
  email?: string;
  photo?: string;
}

interface Troll {
  id: number;
  soyUnTroll: "Soy un troll";
}

export function userToApiUser(): UserB {
  const troll: Troll = {
    id: 1,
    soyUnTroll: "Soy un troll",
  };

  return troll;
}
