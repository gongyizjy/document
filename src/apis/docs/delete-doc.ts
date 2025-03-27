import instance from "../config";

export default function deleteDoc(id: string): Promise<unknown> {
  return instance.delete(`/api/doc/${id}`);
}
