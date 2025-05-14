interface Invitaion {
  // 邀请协作的类型
  type: "doc" | "space";
  // 邀请协作的id blockId 或者 spaceId
  targetId: string;
  // 邀请协作的名称 spaceName 或者 docName
  name: string;
  // 邀请者是谁
  inviter: string;
  // 被邀请者是谁
  invitee: string;
  // 邀请的权限
  status: "pending" | "accepted" | "rejected";
  // 邀请的权限
  accessLevel: "read" | "write";
}

export type { Invitaion };
