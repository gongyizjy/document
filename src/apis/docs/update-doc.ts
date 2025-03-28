import instance from "../config";

interface updateDocProps {
  blockId: string;
  data: {
    title?: string;
    content?: string;
    emoji?: string;
    cover?: string;
  };
}

export default function updateDoc({ blockId, data }: updateDocProps) {
  return instance.put(`/api/doc/${blockId}`, data);
}
